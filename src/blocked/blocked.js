import { timeLeft, formatTime, normalizeDomain, isBlockingActive, resolveTheme } from "../logic.js";

const TEXT = {
  en: {
    kicker: "FocusBloom is guarding your time", title: "Not now, you're blooming", site: "<b>{d}</b> will be here after your session",
    siteAlways: "<b>{d}</b> is on your always-blocked list", left: "left in this focus session", always: "always blocked",
    back: "← Back to work", lang: "עברית",
    quotes: [
      "Small steps every day add up to big results.",
      "You don't need more time. You need fewer tabs.",
      "Twenty-five minutes. You can do anything for twenty-five minutes.",
      "Future you is already saying thank you.",
      "Deep work now, guilt-free break soon."
    ]
  },
  he: {
    kicker: "FocusBloom שומרת על הזמן שלך", title: "לא עכשיו, זה זמן לפרוח", site: "<b>{d}</b> יחכה לך אחרי הסשן",
    siteAlways: "<b>{d}</b> נמצא ברשימת החסימה הקבועה", left: "נשארו בסשן המיקוד", always: "חסום תמיד",
    back: "חזרה לעבודה ←", lang: "English",
    quotes: [
      "צעדים קטנים כל יום מצטברים לתוצאות גדולות.",
      "לא חסר לך זמן. יש לך יותר מדי טאבים.",
      "עשרים וחמש דקות. אפשר לעשות כל דבר לעשרים וחמש דקות.",
      "הגרסה העתידית שלך כבר אומרת לך תודה.",
      "עבודה עמוקה עכשיו, הפסקה בלי רגשות אשם עוד מעט."
    ]
  }
};

const $ = (id) => document.getElementById(id);
const raw = location.search.startsWith("?from=") ? location.search.slice(6) : "";
const from = (() => { try { return /^https?%3A/i.test(raw) ? decodeURIComponent(raw) : raw; } catch { return raw; } })();
const domain = normalizeDomain(from) || "this site";
let state = await chrome.runtime.sendMessage({ cmd: "get" });
let q = Math.floor(Math.random() * 5);

function render() {
  const T = TEXT[state.lang] || TEXT.en;
  const always = state.mode === "always";
  document.documentElement.dataset.theme = resolveTheme(state.theme, matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.lang = state.lang;
  document.documentElement.dir = state.lang === "he" ? "rtl" : "ltr";
  $("kicker").textContent = T.kicker;
  $("title").innerHTML = `${T.title} <span class="emo">🌸</span>`;
  $("site").innerHTML = (always ? T.siteAlways : T.site).replace("{d}", domain.replace(/[<>&"]/g, ""));
  $("leftLabel").textContent = always ? T.always : T.left;
  $("quote").textContent = `“${T.quotes[q]}”`;
  $("back").textContent = T.back;
  $("lang").textContent = T.lang;
  tick();
}

function tick() {
  $("left").textContent = state.mode === "always" && state.phase !== "focus" ? "∞" : formatTime(timeLeft(state));
  // Blocking stopped (break, pause or off): go straight back to it.
  if (!isBlockingActive(state) && /^https?:/.test(from)) location.replace(from);
}

$("back").onclick = () => (history.length > 1 ? history.back() : chrome.tabs.getCurrent((tab) => chrome.tabs.remove(tab.id)));
$("lang").onclick = async () => {
  state = await chrome.runtime.sendMessage({ cmd: "update", patch: { lang: state.lang === "he" ? "en" : "he" } });
  render();
};

setInterval(() => {
  q = (q + 1) % 5;
  $("quote").style.opacity = 0;
  setTimeout(render, 450);
  setTimeout(() => ($("quote").style.opacity = 1), 500);
}, 9000);
setInterval(tick, 500);
chrome.storage.onChanged.addListener(async () => { state = await chrome.runtime.sendMessage({ cmd: "get" }); render(); });

chrome.runtime.sendMessage({ cmd: "hit" });
render();
