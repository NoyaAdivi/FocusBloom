// Pure logic shared by the service worker, the popup and the tests.
// No chrome.* calls here, so everything can run in Node.

export const DEFAULTS = Object.freeze({
  sites: ["youtube.com", "instagram.com", "tiktok.com", "facebook.com", "x.com", "reddit.com"],
  mode: "pomodoro", // "pomodoro" = block only during focus, "always" = block all the time, "off"
  focusMin: 25,
  breakMin: 5,
  longBreakMin: 15,
  cyclesBeforeLong: 4,
  phase: "idle", // "idle" | "focus" | "break"
  endsAt: null, // timestamp (ms) when the current phase ends
  pausedLeft: null, // ms left when paused
  cycle: 0, // finished focus sessions in the current set
  lang: "en",
  stats: { sessions: 0, minutesFocused: 0, blockedHits: 0, day: "" }
});

/** "https://www.YouTube.com/watch?v=1" -> "youtube.com". Returns "" if invalid. */
export function normalizeDomain(input) {
  if (typeof input !== "string") return "";
  let s = input.trim().toLowerCase();
  if (!s) return "";
  if (!/^[a-z]+:\/\//.test(s)) s = "https://" + s;
  let host;
  try {
    host = new URL(s).hostname;
  } catch {
    return "";
  }
  host = host.replace(/^www\./, "").replace(/\.$/, "");
  if (!/^[a-z0-9-]+(\.[a-z0-9-]+)+$/.test(host)) return "";
  return host;
}

/** Adds a site once, keeps the list sorted. */
export function addSite(sites, input) {
  const d = normalizeDomain(input);
  if (!d || sites.includes(d)) return sites;
  return [...sites, d].sort();
}

export function removeSite(sites, domain) {
  return sites.filter((s) => s !== domain);
}

/** Should sites be blocked right now? */
export function isBlockingActive(state) {
  if (state.mode === "always") return true;
  if (state.mode === "pomodoro") return state.phase === "focus" && state.pausedLeft == null;
  return false;
}

/** Does a URL belong to a blocked domain (including subdomains)? */
export function isBlockedUrl(url, sites) {
  const host = normalizeDomain(url);
  if (!host) return false;
  return sites.some((d) => host === d || host.endsWith("." + d));
}

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** declarativeNetRequest rules that send blocked sites to our page. */
export function buildRules(sites, blockedPageUrl) {
  return sites.map((domain, i) => ({
    id: i + 1,
    priority: 1,
    action: {
      type: "redirect",
      redirect: { regexSubstitution: `${blockedPageUrl}?from=\\0` }
    },
    condition: {
      regexFilter: `^https?://([a-z0-9-]+\\.)*${escapeRegex(domain)}(:[0-9]+)?(/.*)?$`,
      resourceTypes: ["main_frame"]
    }
  }));
}

/** What comes after the phase that just ended. */
export function nextPhase(state, now = Date.now()) {
  if (state.phase === "focus") {
    const cycle = state.cycle + 1;
    const isLong = cycle >= state.cyclesBeforeLong;
    const min = isLong ? state.longBreakMin : state.breakMin;
    return { phase: "break", cycle: isLong ? 0 : cycle, endsAt: now + min * 60000, pausedLeft: null, longBreak: isLong };
  }
  return { phase: "focus", cycle: state.cycle, endsAt: now + state.focusMin * 60000, pausedLeft: null, longBreak: false };
}

/** Milliseconds left in the current phase. */
export function timeLeft(state, now = Date.now()) {
  if (state.pausedLeft != null) return state.pausedLeft;
  if (!state.endsAt) return state.focusMin * 60000;
  return Math.max(0, state.endsAt - now);
}

/** 1500000 -> "25:00" */
export function formatTime(ms) {
  const total = Math.ceil(Math.max(0, ms) / 1000);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

/** Text for the toolbar badge: minutes left, or empty. */
export function badgeText(state, now = Date.now()) {
  if (state.phase === "idle") return state.mode === "always" ? "ON" : "";
  if (state.pausedLeft != null) return "II";
  return String(Math.ceil(timeLeft(state, now) / 60000));
}

/** Stats reset every day. */
export function todayKey(now = Date.now()) {
  const d = new Date(now);
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

export function freshStats(stats, now = Date.now()) {
  const day = todayKey(now);
  return stats && stats.day === day ? stats : { sessions: 0, minutesFocused: 0, blockedHits: 0, day };
}
