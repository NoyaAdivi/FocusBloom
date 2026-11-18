<p align="center">
  <a href="#install"><img src="docs/readme/banner-en.svg" width="100%" alt="FocusBloom: a Pomodoro timer that blocks distracting sites only while you focus"></a>
</p>

<p align="center"><a href="README.he.md"><img src="docs/readme/lang-he.svg" height="44" alt="לגרסה בעברית"></a></p>

<p align="center">
  <a href="#install"><img src="https://img.shields.io/badge/Install_in_1_minute-FFD5C9?style=for-the-badge&logo=googlechrome&logoColor=A8483A" alt="Install in 1 minute"></a>
  <a href="#how-it-works"><img src="https://img.shields.io/badge/How_it_works-D9F3E7?style=for-the-badge&logo=diagramsdotnet&logoColor=1F7350" alt="How it works"></a>
  <a href="src"><img src="https://img.shields.io/badge/Source_code-DAD5FF?style=for-the-badge&logo=javascript&logoColor=5548C8" alt="Source code"></a>
</p>

<p align="center">
  <a href="https://github.com/NoyaAdivi/FocusBloom/actions/workflows/tests.yml"><img src="https://github.com/NoyaAdivi/FocusBloom/actions/workflows/tests.yml/badge.svg" alt="Tests"></a>
  <a href="https://developer.chrome.com/docs/extensions/develop/migrate/what-is-mv3"><img src="https://img.shields.io/badge/Manifest-V3-FBD5E0?labelColor=A03A5C" alt="Manifest V3"></a>
  <a href="LICENSE"><img src="https://img.shields.io/github/license/NoyaAdivi/FocusBloom?color=DAD5FF&labelColor=5548C8" alt="License"></a>
  <a href="https://github.com/NoyaAdivi/FocusBloom/commits/main"><img src="https://img.shields.io/github/last-commit/NoyaAdivi/FocusBloom?color=FFD5C9&labelColor=A8483A" alt="Last commit"></a>
  <a href="https://github.com/NoyaAdivi/FocusBloom"><img src="https://img.shields.io/github/languages/top/NoyaAdivi/FocusBloom?color=D9F3E7&labelColor=1F7350" alt="Top language"></a>
</p>

<h3 align="center">Focus for 25 minutes. Your distractions wait outside.</h3>

<p align="center">
  FocusBloom is a Chrome extension that combines a <b>Pomodoro timer</b> and a <b>site blocker</b>.<br>
  YouTube, Instagram and friends are blocked <b>only while you focus</b> and open again the moment your break starts.
</p>

<table align="center">
  <tr>
    <td align="center" width="25%"><a href="#how-it-works"><b>🍅 25 · 5 · 15</b></a><br><sub>focus, break, long break</sub></td>
    <td align="center" width="25%"><a href="src/logic.js"><b>🛡️ 3 modes</b></a><br><sub>in focus, always, off</sub></td>
    <td align="center" width="25%"><a href="README.he.md"><b>🌍 HE · EN</b></a><br><sub>full RTL Hebrew interface</sub></td>
    <td align="center" width="25%"><a href="https://github.com/NoyaAdivi/FocusBloom/actions/workflows/tests.yml"><b>🧪 CI</b></a><br><sub>tests on every push</sub></td>
  </tr>
</table>

<a name="highlights"></a>
<p align="center"><a href="#see-it-in-action"><img src="docs/readme/highlights-en.svg" width="100%" alt="Highlights"></a></p>

<table>
  <tr valign="top">
    <td valign="top" width="33%">
      <p><b>🍅 A timer that does the work</b></p>
      <ul>
        <li><a href="src/popup/popup.js"><b>Blooming timer</b></a>: a petal opens with every minute you focus</li>
        <li><b>Automatic short and long breaks</b>, with a long one every 4 sessions</li>
        <li><b>Keeps running</b> when the popup is closed, with a live badge on the icon</li>
        <li><b>Notifications</b> when focus or a break ends</li>
      </ul>
    </td>
    <td valign="top" width="33%">
      <p><b>🛡️ Blocking that is fair</b></p>
      <ul>
        <li><a href="src/background.js"><b>Blocked only during focus</b></a>, or always if you choose</li>
        <li><b>Subdomains too:</b> blocking youtube.com also blocks m.youtube.com</li>
        <li><b>Open tabs are caught</b> the second a session starts</li>
        <li><a href="src/blocked/blocked.html"><b>A friendly blocked page</b></a> that shows the time left and sends you back when the break starts</li>
      </ul>
    </td>
    <td valign="top" width="33%">
      <p><b>💛 Made with care</b></p>
      <ul>
        <li><b>One click</b> blocks the site you are on</li>
        <li><b>Daily stats:</b> sessions, focus minutes and blocked distractions</li>
        <li><b>Hebrew and English</b> with a full right-to-left layout</li>
        <li><b>Dark mode</b> 🌙 that follows your system, or pick it yourself</li>
        <li><a href="tests/logic.test.js"><b>Unit tested</b></a> logic and a keyboard shortcut (<kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>F</kbd>)</li>
      </ul>
    </td>
  </tr>
</table>

<a name="see-it-in-action"></a>
<p align="center"><a href="#how-it-works"><img src="docs/readme/screens-en.svg" width="100%" alt="See it in action"></a></p>

<p align="center">
  <a href="src/popup"><img src="docs/images/popup-en.png" width="100%" alt="FocusBloom popup: ready timer, blooming focus timer, blocked sites list and daily stats"></a>
</p>

<p align="center">
  <a href="src/blocked"><img src="docs/images/blocked-en.png" width="80%" alt="The page you see when you open a blocked site during focus"></a>
</p>

<p align="center">
  <a href="src/popup/popup.html"><b>Popup</b></a> ·
  <a href="src/blocked/blocked.html"><b>Blocked page</b></a> ·
  <a href="src/background.js"><b>Service worker</b></a> ·
  <a href="src/logic.js"><b>Logic</b></a> ·
  <a href="manifest.json"><b>Manifest</b></a>
</p>

<a name="how-it-works"></a>
<p align="center"><a href="#install"><img src="docs/readme/how-en.svg" width="100%" alt="How it works"></a></p>

```mermaid
flowchart LR
  A([⏸️ Ready]) -->|Start| B([🍅 Focus 25 min<br/>sites blocked])
  B -->|timer ends| C([🌿 Break 5 min<br/>sites open])
  C -->|timer ends| B
  B -->|every 4th session| D([🌸 Long break 15 min])
  D --> B
  B -->|Pause| E([⏯️ Paused<br/>sites open])
  E -->|Resume| B
  style A fill:#E8E4FF,stroke:#6F60F0,color:#2C2668
  style B fill:#FFE6DE,stroke:#E36E57,color:#2C2668
  style C fill:#D9F3E7,stroke:#1F7350,color:#1F4D38
  style D fill:#FBD5E0,stroke:#A03A5C,color:#5C1F33
  style E fill:#FFF1C9,stroke:#B98A1E,color:#5C4410
```

1. The **service worker** ([`background.js`](src/background.js)) owns the timer. It saves `endsAt` in `chrome.storage` and sets one `chrome.alarms` alarm, so the timer survives a closed popup and even a sleeping service worker.
2. When focus starts it writes **`declarativeNetRequest` rules** built by [`buildRules()`](src/logic.js). Chrome itself redirects blocked sites to the blocked page, so nothing has to read your browsing.
3. When the alarm fires the rules are removed, a notification pops up and the next phase starts.
4. All the decisions live in pure functions in [`logic.js`](src/logic.js), which is why they can be [tested in Node](tests/logic.test.js) without a browser.

<details>
<summary><b>🔐 Permissions and why each one is needed</b></summary>
<br>

| Permission | Why |
|---|---|
| [`declarativeNetRequest`](https://developer.chrome.com/docs/extensions/reference/api/declarativeNetRequest) | Redirect blocked sites while you focus |
| [`alarms`](https://developer.chrome.com/docs/extensions/reference/api/alarms) | End each focus session and break on time |
| [`storage`](https://developer.chrome.com/docs/extensions/reference/api/storage) | Save your sites, settings and stats on your computer |
| [`notifications`](https://developer.chrome.com/docs/extensions/reference/api/notifications) | Tell you when focus or a break ends |
| [`tabs`](https://developer.chrome.com/docs/extensions/reference/api/tabs) | Block the site you are on in one click, and catch tabs that are already open |
| [`<all_urls>`](https://developer.chrome.com/docs/extensions/develop/concepts/declare-permissions) | Needed so the redirect works on any site you add |
</details>

<a name="install"></a>
<p align="center"><a href="#tech-stack"><img src="docs/readme/install-en.svg" width="100%" alt="Install in one minute"></a></p>

1. **Get the code:** [download the ZIP](https://github.com/NoyaAdivi/FocusBloom/archive/refs/heads/main.zip) and unzip it, or clone it:
   ```bash
   git clone https://github.com/NoyaAdivi/FocusBloom.git
   ```
2. Open Chrome and go to `chrome://extensions`
3. Turn on **Developer mode** (top right).
4. Click **Load unpacked** and choose the `FocusBloom` folder (the one with `manifest.json`).
5. Pin the 🌸 icon, press **Start**, and focus.

> [!TIP]
> Want to run the tests? With [Node.js](https://nodejs.org) 20 or newer run `npm test`. No packages to install.

<a name="tech-stack"></a>
<p align="center"><a href="#privacy"><img src="docs/readme/stack-en.svg" width="100%" alt="Tech Stack"></a></p>

<p align="center"><b>Extension</b><br>
<a href="https://developer.chrome.com/docs/extensions/develop/migrate/what-is-mv3"><img src="https://img.shields.io/badge/Manifest_V3-FFD5C9?style=for-the-badge&logo=googlechrome&logoColor=A8483A" alt="Manifest V3"></a>
<a href="https://developer.chrome.com/docs/extensions/reference/api/declarativeNetRequest"><img src="https://img.shields.io/badge/declarativeNetRequest-FFD5C9?style=for-the-badge&logo=googlechrome&logoColor=A8483A" alt="declarativeNetRequest"></a>
<a href="https://developer.chrome.com/docs/extensions/reference/api/alarms"><img src="https://img.shields.io/badge/Alarms_API-FFD5C9?style=for-the-badge&logo=googlechrome&logoColor=A8483A" alt="Alarms API"></a>
</p>

<p align="center"><b>Code</b><br>
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"><img src="https://img.shields.io/badge/JavaScript_(ES_modules)-DAD5FF?style=for-the-badge&logo=javascript&logoColor=5548C8" alt="JavaScript"></a>
<a href="https://developer.mozilla.org/en-US/docs/Web/HTML"><img src="https://img.shields.io/badge/HTML5-DAD5FF?style=for-the-badge&logo=html5&logoColor=5548C8" alt="HTML5"></a>
<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations"><img src="https://img.shields.io/badge/CSS_animations-DAD5FF?style=for-the-badge&logo=css&logoColor=5548C8" alt="CSS animations"></a>
<a href="https://developer.mozilla.org/en-US/docs/Web/SVG"><img src="https://img.shields.io/badge/SVG-DAD5FF?style=for-the-badge&logo=svg&logoColor=5548C8" alt="SVG"></a>
</p>

<p align="center"><b>Quality</b><br>
<a href="https://nodejs.org/api/test.html"><img src="https://img.shields.io/badge/node:test-D9F3E7?style=for-the-badge&logo=nodedotjs&logoColor=1F7350" alt="node:test"></a>
<a href="https://github.com/NoyaAdivi/FocusBloom/actions"><img src="https://img.shields.io/badge/GitHub_Actions-D9F3E7?style=for-the-badge&logo=githubactions&logoColor=1F7350" alt="GitHub Actions"></a>
</p>

<details>
<summary><b>📂 Project structure</b></summary>

```
├── manifest.json          the extension's settings and permissions
├── src/
│   ├── background.js      service worker: timer, alarms, blocking rules, notifications
│   ├── logic.js           pure functions: domains, rules, phases, time (tested)
│   ├── popup/             the popup: timer, sites, stats (HTML, CSS, JS)
│   ├── blocked/           the page you see on a blocked site
│   └── icons/             logo in SVG and PNG
├── tests/logic.test.js    unit tests with node:test
├── docs/                  README images and animated headers
└── .github/workflows/     CI that runs the tests on every push
```
</details>

<a name="privacy"></a>
<p align="center"><a href="#contact"><img src="docs/readme/privacy-en.svg" width="100%" alt="Privacy"></a></p>

<p align="center">
  No accounts, no servers, no tracking. Your sites, settings and stats are saved only in <code>chrome.storage</code> on your own computer.<br>
  FocusBloom never reads the pages you visit. Chrome does the blocking with the rules the extension gives it.
</p>

<a name="contact"></a>
<p align="center"><a href="https://www.linkedin.com/in/noya-adivi/"><img src="docs/readme/footer-en.svg" width="100%" alt="Built by Noya Adivi"></a></p>

<p align="center">
  <a href="https://www.linkedin.com/in/noya-adivi/"><img src="https://img.shields.io/badge/LinkedIn-DAD5FF?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iIzU1NDhDOCIgZD0iTTIwLjQ1IDIwLjQ1aC0zLjU2di01LjU3YzAtMS4zMy0uMDMtMy4wNC0xLjg1LTMuMDQtMS44NiAwLTIuMTQgMS40NS0yLjE0IDIuOTR2NS42N0g5LjM1VjloMy40MXYxLjU2aC4wNWMuNDgtLjkgMS42NC0xLjg1IDMuMzctMS44NSAzLjYgMCA0LjI3IDIuMzcgNC4yNyA1LjQ2djYuMjh6TTUuMzQgNy40M2EyLjA2IDIuMDYgMCAxIDEgMC00LjEzIDIuMDYgMi4wNiAwIDAgMSAwIDQuMTN6TTcuMTIgMjAuNDVIMy41NlY5aDMuNTZ2MTEuNDV6TTIyLjIyIDBIMS43N0MuNzkgMCAwIC43NyAwIDEuNzN2MjAuNTRDMCAyMy4yMy43OSAyNCAxLjc3IDI0aDIwLjQ1Yy45OCAwIDEuNzgtLjc3IDEuNzgtMS43M1YxLjczQzI0IC43NyAyMy4yIDAgMjIuMjIgMHoiLz48L3N2Zz4=" alt="LinkedIn"></a>
  <a href="https://noyaadivi.github.io/noya-website"><img src="https://img.shields.io/badge/Portfolio-D9F3E7?style=for-the-badge&logo=githubpages&logoColor=1F7350" alt="Portfolio"></a>
  <a href="https://github.com/NoyaAdivi/Okeat"><img src="https://img.shields.io/badge/Also_see_Okeat-FFD5C9?style=for-the-badge&logo=github&logoColor=A8483A" alt="Also see Okeat"></a>
  <a href="https://github.com/NoyaAdivi"><img src="https://img.shields.io/badge/More_projects-FBD5E0?style=for-the-badge&logo=github&logoColor=A03A5C" alt="More projects"></a>
</p>
