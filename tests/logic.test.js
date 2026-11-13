import { test } from "node:test";
import assert from "node:assert/strict";
import {
  DEFAULTS, normalizeDomain, addSite, removeSite, isBlockingActive, isBlockedUrl,
  buildRules, nextPhase, timeLeft, formatTime, badgeText, freshStats
} from "../src/logic.js";

test("normalizeDomain cleans URLs and rejects junk", () => {
  assert.equal(normalizeDomain("https://www.YouTube.com/watch?v=1"), "youtube.com");
  assert.equal(normalizeDomain("  reddit.com/r/all "), "reddit.com");
  assert.equal(normalizeDomain("m.facebook.com"), "m.facebook.com");
  assert.equal(normalizeDomain("not a site"), "");
  assert.equal(normalizeDomain("localhost"), "");
  assert.equal(normalizeDomain(42), "");
});

test("addSite and removeSite keep a clean sorted list", () => {
  let sites = addSite([], "www.x.com");
  sites = addSite(sites, "https://instagram.com/p/1");
  sites = addSite(sites, "x.com");
  assert.deepEqual(sites, ["instagram.com", "x.com"]);
  assert.deepEqual(removeSite(sites, "x.com"), ["instagram.com"]);
  assert.equal(addSite(sites, "???"), sites);
});

test("blocking follows the mode and the phase", () => {
  assert.equal(isBlockingActive({ ...DEFAULTS, mode: "pomodoro", phase: "focus" }), true);
  assert.equal(isBlockingActive({ ...DEFAULTS, mode: "pomodoro", phase: "focus", pausedLeft: 1000 }), false);
  assert.equal(isBlockingActive({ ...DEFAULTS, mode: "pomodoro", phase: "break" }), false);
  assert.equal(isBlockingActive({ ...DEFAULTS, mode: "always", phase: "idle" }), true);
  assert.equal(isBlockingActive({ ...DEFAULTS, mode: "off", phase: "focus" }), false);
});

test("isBlockedUrl matches subdomains but not look-alikes", () => {
  const sites = ["youtube.com"];
  assert.equal(isBlockedUrl("https://m.youtube.com/", sites), true);
  assert.equal(isBlockedUrl("https://youtube.com", sites), true);
  assert.equal(isBlockedUrl("https://notyoutube.com", sites), false);
});

test("buildRules regex blocks the domain and its subdomains only", () => {
  const [rule] = buildRules(["youtube.com"], "chrome-extension://abc/src/blocked/blocked.html");
  assert.equal(rule.id, 1);
  assert.equal(rule.action.type, "redirect");
  const re = new RegExp(rule.condition.regexFilter);
  assert.ok(re.test("https://www.youtube.com/watch?v=1"));
  assert.ok(re.test("http://youtube.com"));
  assert.ok(!re.test("https://notyoutube.com/"));
  assert.ok(!re.test("https://youtube.com.evil.io/"));
});

test("nextPhase cycles focus, break and long break", () => {
  const now = 0;
  let s = { ...DEFAULTS, phase: "focus", cycle: 0 };
  let n = nextPhase(s, now);
  assert.equal(n.phase, "break");
  assert.equal(n.cycle, 1);
  assert.equal(n.endsAt, 5 * 60000);

  s = { ...DEFAULTS, phase: "focus", cycle: 3 };
  n = nextPhase(s, now);
  assert.equal(n.longBreak, true);
  assert.equal(n.cycle, 0);
  assert.equal(n.endsAt, 15 * 60000);

  n = nextPhase({ ...DEFAULTS, phase: "break" }, now);
  assert.equal(n.phase, "focus");
  assert.equal(n.endsAt, 25 * 60000);
});

test("time helpers", () => {
  assert.equal(formatTime(25 * 60000), "25:00");
  assert.equal(formatTime(61000), "01:01");
  assert.equal(formatTime(-5), "00:00");
  assert.equal(timeLeft({ ...DEFAULTS, endsAt: 10000 }, 4000), 6000);
  assert.equal(timeLeft({ ...DEFAULTS, pausedLeft: 777 }), 777);
  assert.equal(badgeText({ ...DEFAULTS, phase: "focus", endsAt: 90000 }, 0), "2");
  assert.equal(badgeText({ ...DEFAULTS, mode: "always" }), "ON");
});

test("stats reset on a new day", () => {
  const old = { sessions: 4, minutesFocused: 100, blockedHits: 9, day: "2000-1-1" };
  assert.equal(freshStats(old).sessions, 0);
  const today = freshStats(null);
  assert.equal(freshStats(today), today);
});
