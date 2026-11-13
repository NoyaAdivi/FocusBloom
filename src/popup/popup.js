import { DEFAULTS, addSite, removeSite, normalizeDomain, timeLeft, formatTime, resolveTheme } from "../logic.js";

const darkQuery = matchMedia("(prefers-color-scheme: dark)");

const I18N = {
  en: {
    tagline: "Bloom while you focus", tabTimer: "Timer", tabSites: "Sites", tabStats: "Stats",
    start: "Start", resume: "Resume", pause: "Pause", skip: "Skip", reset: "Reset",
    blockWhen: "Block", modePomodoro: "In focus", modeAlways: "Always", modeOff: "Off",
    focusPhase: "Focus", breakPhase: "Break", longBreakPhase: "Long break", idlePhase: "Ready", pausedPhase: "Paused",
    stBlocking: "🛡️ {n} sites are blocked right now", stOpen: "🌿 Sites are open. Enjoy the break",
    stIdle: "Press Start and your sites get blocked for {m} minutes", stOff: "Blocking is off",
    add: "Add", placeholder: "e.g. youtube.com", addCurrent: "➕ Block {d}", addCurrentNone: "Open a site to block it in one click",
    empty: "No sites yet. Add the ones that steal your focus.", removeTitle: "Remove",
    stSessions: "sessions today", stMinutes: "minutes focused", stHits: "distractions blocked",
    durations: "Durations (minutes)", focus: "Focus", shortBreak: "Short break", longBreak: "Long break", cyclesLong: "Sessions until long break",
    source: "Source code on GitHub ↗", toDark: "Dark mode", toLight: "Light mode"
  },
  he: {
    tagline: "פורחים בזמן שמתמקדים", tabTimer: "טיימר", tabSites: "אתרים", tabStats: "נתונים",
    start: "התחלה", resume: "המשך", pause: "השהיה", skip: "דילוג", reset: "איפוס",
    blockWhen: "חסימה", modePomodoro: "בזמן מיקוד", modeAlways: "תמיד", modeOff: "כבויה",
    focusPhase: "מיקוד", breakPhase: "הפסקה", longBreakPhase: "הפסקה ארוכה", idlePhase: "מוכנה", pausedPhase: "מושהה",
    stBlocking: "🛡️ {n} אתרים חסומים עכשיו", stOpen: "🌿 האתרים פתוחים. תהני מההפסקה",
    stIdle: "לוחצים התחלה והאתרים נחסמים ל-{m} דקות", stOff: "החסימה כבויה",
    add: "הוספה", placeholder: "למשל youtube.com", addCurrent: "➕ לחסום את {d}", addCurrentNone: "פתחי אתר כדי לחסום אותו בלחיצה",
    empty: "עוד אין אתרים. הוסיפי את אלה שגונבים לך את הריכוז.", removeTitle: "הסרה",
    stSessions: "סשנים היום", stMinutes: "דקות מיקוד", stHits: "הסחות נחסמו",
    durations: "משכי זמן (דקות)", focus: "מיקוד", shortBreak: "הפסקה קצרה", longBreak: "הפסקה ארוכה", cyclesLong: "סשנים עד הפסקה ארוכה",
    source: "קוד המקור בגיטהאב ↗", toDark: "מצב כהה", toLight: "מצב בהיר"
  }
};

const PETALS = 12;
const PETAL_COLORS = ["#FFB4A2", "#B3A9FA", "#A9E3CD", "#F5B8C8", "#FFE3A3", "#CFC8FF"];
const CIRC = 2 * Math.PI * 62;
const $ = (id) => document.getElementById(id);

let state = { ...DEFAULTS };
let currentDomain = "";

const send = (cmd, extra = {}) => chrome.runtime.sendMessage({ cmd, ...extra });
const t = (key, vars = {}) => (I18N[state.lang]?.[key] ?? I18N.en[key]).replace(/\{(\w+)\}/g, (_, k) => vars[k]);

// ---------- petals ----------
function buildPetals() {
  const g = $("petal-group");
  for (let i = 0; i < PETALS; i++) {
    const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
    use.setAttribute("href", "#petal");
    use.setAttribute("fill", PETAL_COLORS[i % PETAL_COLORS.length]);
    use.style.transform = `rotate(${(360 / PETALS) * i}deg) scale(.5)`;
    use.style.opacity = ".15";
    use.dataset.angle = (360 / PETALS) * i;
    g.appendChild(use);
  }
}

function paintPetals(progress) {
  const open = Math.round(progress * PETALS);
  document.querySelectorAll("#petal-group use").forEach((p, i) => {
    const on = i < open;
    p.style.opacity = on ? ".9" : ".15";
    p.style.transform = `rotate(${p.dataset.angle}deg) scale(${on ? 1.75 : 0.5})`;
  });
}

// ---------- render ----------
function applyTheme() {
  const theme = resolveTheme(state.theme, darkQuery.matches);
  document.documentElement.dataset.theme = theme;
  $("theme").textContent = theme === "dark" ? "☀️" : "🌙";
  $("theme").title = theme === "dark" ? t("toLight") : t("toDark");
}

function applyLang() {
  document.documentElement.lang = state.lang;
  document.documentElement.dir = state.lang === "he" ? "rtl" : "ltr";
  $("lang").textContent = state.lang === "he" ? "EN" : "עב";
  document.querySelectorAll("[data-t]").forEach((el) => (el.textContent = t(el.dataset.t)));
  $("site-input").placeholder = t("placeholder");
  moveInk();
}

function phaseTotal() {
  if (state.phase === "focus" || state.phase === "idle") return state.focusMin * 60000;
  return (state.cycle === 0 ? state.longBreakMin : state.breakMin) * 60000;
}

function renderTimer() {
  const left = timeLeft(state);
  const paused = state.pausedLeft != null;
  const running = state.phase !== "idle" && !paused;
  const progress = state.phase === "idle" ? 0 : 1 - left / phaseTotal();

  $("time").textContent = formatTime(state.phase === "idle" ? state.focusMin * 60000 : left);
  $("bar").style.strokeDasharray = CIRC;
  $("bar").style.strokeDashoffset = CIRC * (1 - progress);
  paintPetals(progress);
  document.body.classList.toggle("running", running);

  const ph = $("phase");
  ph.className = "phase " + state.phase;
  ph.textContent = paused ? t("pausedPhase")
    : state.phase === "focus" ? t("focusPhase")
    : state.phase === "break" ? t(state.cycle === 0 ? "longBreakPhase" : "breakPhase")
    : t("idlePhase");

  $("cycles").innerHTML = Array.from({ length: state.cyclesBeforeLong }, (_, i) => `<i class="${i < state.cycle ? "on" : ""}"></i>`).join("");

  $("start").hidden = running;
  $("start").textContent = paused ? t("resume") : t("start");
  $("pause").hidden = !running;
  $("skip").hidden = state.phase === "idle";

  document.querySelectorAll("#mode button").forEach((b) => b.classList.toggle("on", b.dataset.mode === state.mode));

  const blocking = state.mode === "always" || (state.mode === "pomodoro" && state.phase === "focus" && !paused);
  $("status").textContent = state.mode === "off" ? t("stOff")
    : blocking ? t("stBlocking", { n: state.sites.length })
    : state.phase === "break" ? t("stOpen")
    : t("stIdle", { m: state.focusMin });
}

function renderSites() {
  const list = $("site-list");
  list.innerHTML = "";
  state.sites.forEach((d) => {
    const li = document.createElement("li");
    li.innerHTML = `<img alt="" src="https://www.google.com/s2/favicons?sz=32&domain=${d}"><span></span><button title="${t("removeTitle")}">✕</button>`;
    li.querySelector("span").textContent = d;
    li.querySelector("img").onerror = (e) => {
      const av = document.createElement("i");
      av.className = "av";
      av.textContent = d[0].toUpperCase();
      av.style.background = PETAL_COLORS[d.length % PETAL_COLORS.length];
      e.target.replaceWith(av);
    };
    li.querySelector("button").onclick = () => {
      li.classList.add("out");
      setTimeout(() => save({ sites: removeSite(state.sites, d) }), 280);
    };
    list.appendChild(li);
  });
  $("empty").hidden = state.sites.length > 0;

  const btn = $("add-current");
  const can = currentDomain && !state.sites.includes(currentDomain);
  btn.disabled = !can;
  btn.style.opacity = can ? 1 : 0.55;
  btn.textContent = can ? t("addCurrent", { d: currentDomain }) : t("addCurrentNone");
}

function renderStats() {
  $("st-sessions").textContent = state.stats.sessions;
  $("st-minutes").textContent = state.stats.minutesFocused;
  $("st-hits").textContent = state.stats.blockedHits;
  ["focusMin", "breakMin", "longBreakMin", "cyclesBeforeLong"].forEach((k) => {
    if (document.activeElement !== $(k)) $(k).value = state[k];
  });
}

function render() {
  applyTheme();
  applyLang();
  renderTimer();
  renderSites();
  renderStats();
}

async function save(patch) {
  state = await send("update", { patch });
  render();
}

// ---------- tabs ----------
function moveInk() {
  const tabs = [...document.querySelectorAll(".tab")];
  const i = tabs.findIndex((b) => b.classList.contains("active"));
  const dir = document.documentElement.dir === "rtl" ? -1 : 1;
  document.querySelector(".tab-ink").style.transform = `translateX(${dir * i * 100}%)`;
}

document.querySelectorAll(".tab").forEach((tab) => {
  tab.onclick = () => {
    document.querySelectorAll(".tab").forEach((b) => b.classList.toggle("active", b === tab));
    document.querySelectorAll(".panel").forEach((p) => p.classList.toggle("show", p.id === tab.dataset.tab));
    moveInk();
  };
});

// ---------- events ----------
$("start").onclick = async () => { state = await send("start"); render(); };
$("pause").onclick = async () => { state = await send("pause"); render(); };
$("skip").onclick = async () => { state = await send("skip"); render(); };
$("reset").onclick = async () => { state = await send("reset"); render(); };
$("theme").onclick = () => save({ theme: resolveTheme(state.theme, darkQuery.matches) === "dark" ? "light" : "dark" });
darkQuery.addEventListener("change", applyTheme);
$("lang").onclick = () => save({ lang: state.lang === "he" ? "en" : "he" });
document.querySelectorAll("#mode button").forEach((b) => (b.onclick = () => save({ mode: b.dataset.mode })));

$("add-form").onsubmit = (e) => {
  e.preventDefault();
  const input = $("site-input");
  const d = normalizeDomain(input.value);
  if (!d || state.sites.includes(d)) {
    $("add-form").classList.remove("shake");
    void $("add-form").offsetWidth;
    $("add-form").classList.add("shake");
    return;
  }
  input.value = "";
  save({ sites: addSite(state.sites, d) });
};
$("add-current").onclick = () => currentDomain && save({ sites: addSite(state.sites, currentDomain) });

["focusMin", "breakMin", "longBreakMin", "cyclesBeforeLong"].forEach((k) => {
  $(k).onchange = () => {
    const el = $(k);
    const v = Math.min(+el.max, Math.max(+el.min, Math.round(+el.value || +el.min)));
    save({ [k]: v });
  };
});

chrome.storage.onChanged.addListener(async () => { state = await send("get"); render(); });

// ---------- boot ----------
(async () => {
  buildPetals();
  state = await send("get");
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab?.url?.startsWith("http")) currentDomain = normalizeDomain(tab.url);
  render();
  setInterval(renderTimer, 500);
})();
