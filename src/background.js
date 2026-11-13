import {
  DEFAULTS, isBlockingActive, buildRules, nextPhase, timeLeft, badgeText, freshStats, isBlockedUrl
} from "./logic.js";

const ALARM = "phase-end";
const TICK = "badge-tick";
const BLOCKED_PAGE = chrome.runtime.getURL("src/blocked/blocked.html");

async function getState() {
  const saved = await chrome.storage.local.get(null);
  return { ...DEFAULTS, ...saved, stats: freshStats(saved.stats) };
}

async function setState(patch) {
  await chrome.storage.local.set(patch);
  const state = await getState();
  await applyRules(state);
  await updateBadge(state);
  return state;
}

/** Replace every dynamic rule with the ones that match the current state. */
async function applyRules(state) {
  const old = await chrome.declarativeNetRequest.getDynamicRules();
  const addRules = isBlockingActive(state) ? buildRules(state.sites, BLOCKED_PAGE) : [];
  await chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: old.map((r) => r.id),
    addRules
  });
  if (addRules.length) await sweepOpenTabs(state);
}

/** Tabs that were already open on a blocked site get redirected too. */
async function sweepOpenTabs(state) {
  const tabs = await chrome.tabs.query({});
  for (const tab of tabs) {
    if (tab.url && isBlockedUrl(tab.url, state.sites)) {
      chrome.tabs.update(tab.id, { url: `${BLOCKED_PAGE}?from=${encodeURIComponent(tab.url)}` });
    }
  }
}

async function updateBadge(state) {
  const focus = state.phase === "focus";
  await chrome.action.setBadgeText({ text: badgeText(state) });
  await chrome.action.setBadgeBackgroundColor({ color: focus || state.mode === "always" ? "#E36E57" : "#1F7350" });
  await chrome.action.setBadgeTextColor?.({ color: "#FFFFFF" });
}

function schedule(endsAt) {
  chrome.alarms.clear(ALARM);
  chrome.alarms.clear(TICK);
  if (!endsAt) return;
  chrome.alarms.create(ALARM, { when: endsAt });
  chrome.alarms.create(TICK, { periodInMinutes: 1 });
}

function notify(titleKey, bodyKey, lang) {
  const t = {
    en: { focusDone: "Focus session done 🌸", breakDone: "Break is over 🍅", rest: "Time for a break. Your sites are open again.", back: "Back to focus. Distractions are blocked." },
    he: { focusDone: "סשן מיקוד הסתיים 🌸", breakDone: "ההפסקה נגמרה 🍅", rest: "זמן להפסקה. האתרים פתוחים שוב.", back: "חוזרים למיקוד. הסחות הדעת חסומות." }
  }[lang] || {};
  chrome.notifications.create({
    type: "basic",
    iconUrl: chrome.runtime.getURL("src/icons/icon128.png"),
    title: t[titleKey],
    message: t[bodyKey],
    priority: 2
  });
}

// ---------- commands from the popup and the blocked page ----------
const commands = {
  async start() {
    const s = await getState();
    const patch = s.pausedLeft != null
      ? { endsAt: Date.now() + s.pausedLeft, pausedLeft: null }
      : { ...nextPhase({ ...s, phase: "break" }) };
    schedule(patch.endsAt);
    return setState(patch);
  },
  async pause() {
    const s = await getState();
    if (s.phase === "idle" || s.pausedLeft != null) return s;
    schedule(null);
    return setState({ pausedLeft: timeLeft(s), endsAt: null });
  },
  async reset() {
    schedule(null);
    return setState({ phase: "idle", endsAt: null, pausedLeft: null, cycle: 0 });
  },
  async skip() {
    return finishPhase(false);
  },
  async update({ patch }) {
    return setState(patch);
  },
  async hit() {
    const s = await getState();
    return setState({ stats: { ...s.stats, blockedHits: s.stats.blockedHits + 1 } });
  },
  async get() {
    return getState();
  }
};

async function finishPhase(withNotice = true) {
  const s = await getState();
  if (s.phase === "idle") return s;
  const next = nextPhase(s);
  const stats = { ...s.stats };
  if (s.phase === "focus") {
    stats.sessions += 1;
    stats.minutesFocused += s.focusMin;
  }
  if (withNotice) notify(s.phase === "focus" ? "focusDone" : "breakDone", s.phase === "focus" ? "rest" : "back", s.lang);
  schedule(next.endsAt);
  return setState({ ...next, stats });
}

chrome.runtime.onMessage.addListener((msg, _sender, reply) => {
  const run = commands[msg?.cmd];
  if (!run) return false;
  run(msg).then(reply);
  return true; // keep the channel open for the async reply
});

chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === ALARM) await finishPhase(true);
  if (alarm.name === TICK) await updateBadge(await getState());
});

chrome.runtime.onInstalled.addListener(async ({ reason }) => {
  if (reason === "install") await chrome.storage.local.set({ ...DEFAULTS, lang: chrome.i18n.getUILanguage().startsWith("he") ? "he" : "en" });
  await setState({});
});

chrome.runtime.onStartup.addListener(async () => {
  const s = await getState();
  if (s.endsAt && s.endsAt <= Date.now()) await finishPhase(false);
  else await setState({});
});
