<div dir="rtl">

<p align="center">
  <a href="#install"><img src="docs/readme/banner-he.svg" width="100%" alt="FocusBloom: טיימר פומודורו שחוסם אתרים מסיחים רק בזמן מיקוד"></a>
</p>

<p align="center"><a href="README.md"><img src="docs/readme/lang-en.svg" height="44" alt="English version"></a></p>

<p align="center">
  <a href="#install"><img src="https://img.shields.io/badge/התקנה_בדקה-FFD5C9?style=for-the-badge&logo=googlechrome&logoColor=A8483A" alt="התקנה בדקה"></a>
  <a href="#how-it-works"><img src="https://img.shields.io/badge/איך_זה_עובד-D9F3E7?style=for-the-badge&logo=diagramsdotnet&logoColor=1F7350" alt="איך זה עובד"></a>
  <a href="src"><img src="https://img.shields.io/badge/קוד_המקור-DAD5FF?style=for-the-badge&logo=javascript&logoColor=5548C8" alt="קוד המקור"></a>
</p>

<p align="center">
  <a href="https://github.com/NoyaAdivi/FocusBloom/actions/workflows/tests.yml"><img src="https://github.com/NoyaAdivi/FocusBloom/actions/workflows/tests.yml/badge.svg" alt="Tests"></a>
  <a href="https://developer.chrome.com/docs/extensions/develop/migrate/what-is-mv3"><img src="https://img.shields.io/badge/Manifest-V3-FBD5E0?labelColor=A03A5C" alt="Manifest V3"></a>
  <a href="LICENSE"><img src="https://img.shields.io/github/license/NoyaAdivi/FocusBloom?color=DAD5FF&labelColor=5548C8" alt="רישיון"></a>
  <a href="https://github.com/NoyaAdivi/FocusBloom/commits/main"><img src="https://img.shields.io/github/last-commit/NoyaAdivi/FocusBloom?color=FFD5C9&labelColor=A8483A" alt="עדכון אחרון"></a>
  <a href="https://github.com/NoyaAdivi/FocusBloom"><img src="https://img.shields.io/github/languages/top/NoyaAdivi/FocusBloom?color=D9F3E7&labelColor=1F7350" alt="שפה עיקרית"></a>
</p>

<h3 align="center">מתמקדים 25 דקות. הסחות הדעת מחכות בחוץ.</h3>

<p align="center">
  FocusBloom הוא תוסף לכרום שמחבר <b>טיימר פומודורו</b> ו<b>חוסם אתרים</b>.<br>
  יוטיוב, אינסטגרם והחברים שלהם נחסמים <b>רק בזמן המיקוד</b>, ונפתחים שוב ברגע שההפסקה מתחילה.
</p>

<table align="center" dir="rtl">
  <tr>
    <td align="center" width="25%"><a href="#how-it-works"><b>🍅 25 · 5 · 15</b></a><br><sub>מיקוד, הפסקה, הפסקה ארוכה</sub></td>
    <td align="center" width="25%"><a href="src/logic.js"><b>🛡️ 3 מצבים</b></a><br><sub>בזמן מיקוד, תמיד, כבוי</sub></td>
    <td align="center" width="25%"><a href="README.md"><b>🌍 HE · EN</b></a><br><sub>ממשק מלא בעברית מימין לשמאל</sub></td>
    <td align="center" width="25%"><a href="https://github.com/NoyaAdivi/FocusBloom/actions/workflows/tests.yml"><b>🧪 CI</b></a><br><sub>בדיקות בכל דחיפה</sub></td>
  </tr>
</table>

<a name="highlights"></a>
<p align="center"><a href="#see-it-in-action"><img src="docs/readme/highlights-he.svg" width="100%" alt="מה מיוחד בו"></a></p>

<table dir="rtl">
  <tr valign="top">
    <td valign="top" width="33%" dir="rtl">
      <p><b>🍅 טיימר שעושה את העבודה</b></p>
      <ul>
        <li><a href="src/popup/popup.js"><b>טיימר שפורח</b></a>: עלה כותרת נפתח עם כל דקה של מיקוד</li>
        <li><b>הפסקות קצרות וארוכות</b> אוטומטיות, הפסקה ארוכה כל 4 סשנים</li>
        <li><b>ממשיך לרוץ</b> גם כשהחלון סגור, עם מונה חי על האייקון</li>
        <li><b>התראות</b> כשהמיקוד או ההפסקה נגמרים</li>
      </ul>
    </td>
    <td valign="top" width="33%" dir="rtl">
      <p><b>🛡️ חסימה הוגנת</b></p>
      <ul>
        <li><a href="src/background.js"><b>חסימה רק בזמן מיקוד</b></a>, או תמיד אם בוחרים</li>
        <li><b>גם תתי דומיינים:</b> חסימת youtube.com חוסמת גם את m.youtube.com</li>
        <li><b>טאבים פתוחים נתפסים</b> ברגע שהסשן מתחיל</li>
        <li><a href="src/blocked/blocked.html"><b>דף חסימה נעים</b></a> שמראה כמה זמן נשאר ומחזיר לאתר כשההפסקה מתחילה</li>
      </ul>
    </td>
    <td valign="top" width="33%" dir="rtl">
      <p><b>💛 נבנה בתשומת לב</b></p>
      <ul>
        <li><b>לחיצה אחת</b> חוסמת את האתר שנמצאים בו</li>
        <li><b>נתונים יומיים:</b> סשנים, דקות מיקוד והסחות שנחסמו</li>
        <li><b>עברית ואנגלית</b> עם פריסה מלאה מימין לשמאל</li>
        <li><b>מצב כהה</b> 🌙 שעוקב אחרי המערכת, או שבוחרים לבד</li>
        <li><a href="tests/logic.test.js"><b>לוגיקה עם בדיקות</b></a> וקיצור מקלדת (<kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>F</kbd>)</li>
      </ul>
    </td>
  </tr>
</table>

<a name="see-it-in-action"></a>
<p align="center"><a href="#how-it-works"><img src="docs/readme/screens-he.svg" width="100%" alt="ככה זה נראה"></a></p>

<p align="center">
  <a href="src/popup"><img src="docs/images/popup-he.png" width="100%" alt="החלון הקופץ של FocusBloom: טיימר מוכן, טיימר מיקוד פורח, רשימת אתרים חסומים ונתונים יומיים"></a>
</p>

<p align="center">
  <a href="src/blocked"><img src="docs/images/blocked-he.png" width="80%" alt="הדף שמופיע כשנכנסים לאתר חסום בזמן מיקוד"></a>
</p>

<p align="center">
  <a href="src/popup/popup.html"><b>חלון קופץ</b></a> ·
  <a href="src/blocked/blocked.html"><b>דף חסימה</b></a> ·
  <a href="src/background.js"><b>Service worker</b></a> ·
  <a href="src/logic.js"><b>לוגיקה</b></a> ·
  <a href="manifest.json"><b>Manifest</b></a>
</p>

<a name="how-it-works"></a>
<p align="center"><a href="#install"><img src="docs/readme/how-he.svg" width="100%" alt="איך זה עובד"></a></p>

</div>

```mermaid
flowchart RL
  A([⏸️ מוכן]) -->|התחלה| B([🍅 מיקוד 25 דק׳<br/>אתרים חסומים])
  B -->|הזמן נגמר| C([🌿 הפסקה 5 דק׳<br/>אתרים פתוחים])
  C -->|הזמן נגמר| B
  B -->|כל סשן רביעי| D([🌸 הפסקה ארוכה 15 דק׳])
  D --> B
  B -->|השהיה| E([⏯️ מושהה<br/>אתרים פתוחים])
  E -->|המשך| B
  style A fill:#E8E4FF,stroke:#6F60F0,color:#2C2668
  style B fill:#FFE6DE,stroke:#E36E57,color:#2C2668
  style C fill:#D9F3E7,stroke:#1F7350,color:#1F4D38
  style D fill:#FBD5E0,stroke:#A03A5C,color:#5C1F33
  style E fill:#FFF1C9,stroke:#B98A1E,color:#5C4410
```

<div dir="rtl">

1. ה־**service worker** ([`background.js`](src/background.js)) מנהל את הטיימר. הוא שומר את `endsAt` ב־`chrome.storage` וקובע שעון מעורר אחד של `chrome.alarms`, כך שהטיימר שורד גם חלון סגור וגם service worker שנרדם.
2. כשהמיקוד מתחיל הוא כותב **חוקי `declarativeNetRequest`** שנבנים ב־[`buildRules()`](src/logic.js). כרום עצמו מפנה את האתרים החסומים לדף החסימה, כך שאף אחד לא צריך לקרוא את הגלישה שלך.
3. כשהשעון המעורר מצלצל, החוקים נמחקים, קופצת הודעה והשלב הבא מתחיל.
4. כל ההחלטות נמצאות בפונקציות טהורות ב־[`logic.js`](src/logic.js), ולכן אפשר [לבדוק אותן ב־Node](tests/logic.test.js) בלי דפדפן.

<details>
<summary><b>🔐 ההרשאות ולמה צריך כל אחת</b></summary>
<br>

| הרשאה | למה |
|---|---|
| [`declarativeNetRequest`](https://developer.chrome.com/docs/extensions/reference/api/declarativeNetRequest) | להפנות אתרים חסומים בזמן מיקוד |
| [`alarms`](https://developer.chrome.com/docs/extensions/reference/api/alarms) | לסיים כל סשן והפסקה בזמן |
| [`storage`](https://developer.chrome.com/docs/extensions/reference/api/storage) | לשמור אתרים, הגדרות ונתונים אצלך במחשב |
| [`notifications`](https://developer.chrome.com/docs/extensions/reference/api/notifications) | להודיע כשמיקוד או הפסקה נגמרים |
| [`tabs`](https://developer.chrome.com/docs/extensions/reference/api/tabs) | לחסום בלחיצה את האתר הפתוח, ולתפוס טאבים שכבר פתוחים |
| [`<all_urls>`](https://developer.chrome.com/docs/extensions/develop/concepts/declare-permissions) | כדי שההפניה תעבוד על כל אתר שמוסיפים |
</details>

<a name="install"></a>
<p align="center"><a href="#tech-stack"><img src="docs/readme/install-he.svg" width="100%" alt="התקנה בדקה"></a></p>

1. **מורידים את הקוד:** [הורדת ZIP](https://github.com/NoyaAdivi/FocusBloom/archive/refs/heads/main.zip) ופותחים אותו, או משכפלים:

</div>

```bash
git clone https://github.com/NoyaAdivi/FocusBloom.git
```

<div dir="rtl">

2. פותחים את כרום ונכנסים ל־`chrome://extensions`
3. מדליקים את **Developer mode** (למעלה בצד).
4. לוחצים **Load unpacked** ובוחרים את התיקייה `FocusBloom` (זו שיש בה `manifest.json`).
5. נועצים את האייקון 🌸, לוחצים **התחלה**, ומתמקדים.

> [!TIP]
> רוצים להריץ את הבדיקות? עם [Node.js](https://nodejs.org) גרסה 20 ומעלה מריצים `npm test`. אין חבילות להתקין.

<a name="tech-stack"></a>
<p align="center"><a href="#privacy"><img src="docs/readme/stack-he.svg" width="100%" alt="טכנולוגיות"></a></p>

<p align="center"><b>התוסף</b><br>
<a href="https://developer.chrome.com/docs/extensions/develop/migrate/what-is-mv3"><img src="https://img.shields.io/badge/Manifest_V3-FFD5C9?style=for-the-badge&logo=googlechrome&logoColor=A8483A" alt="Manifest V3"></a>
<a href="https://developer.chrome.com/docs/extensions/reference/api/declarativeNetRequest"><img src="https://img.shields.io/badge/declarativeNetRequest-FFD5C9?style=for-the-badge&logo=googlechrome&logoColor=A8483A" alt="declarativeNetRequest"></a>
<a href="https://developer.chrome.com/docs/extensions/reference/api/alarms"><img src="https://img.shields.io/badge/Alarms_API-FFD5C9?style=for-the-badge&logo=googlechrome&logoColor=A8483A" alt="Alarms API"></a>
</p>

<p align="center"><b>קוד</b><br>
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"><img src="https://img.shields.io/badge/JavaScript_(ES_modules)-DAD5FF?style=for-the-badge&logo=javascript&logoColor=5548C8" alt="JavaScript"></a>
<a href="https://developer.mozilla.org/en-US/docs/Web/HTML"><img src="https://img.shields.io/badge/HTML5-DAD5FF?style=for-the-badge&logo=html5&logoColor=5548C8" alt="HTML5"></a>
<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations"><img src="https://img.shields.io/badge/CSS_animations-DAD5FF?style=for-the-badge&logo=css&logoColor=5548C8" alt="CSS animations"></a>
<a href="https://developer.mozilla.org/en-US/docs/Web/SVG"><img src="https://img.shields.io/badge/SVG-DAD5FF?style=for-the-badge&logo=svg&logoColor=5548C8" alt="SVG"></a>
</p>

<p align="center"><b>איכות</b><br>
<a href="https://nodejs.org/api/test.html"><img src="https://img.shields.io/badge/node:test-D9F3E7?style=for-the-badge&logo=nodedotjs&logoColor=1F7350" alt="node:test"></a>
<a href="https://github.com/NoyaAdivi/FocusBloom/actions"><img src="https://img.shields.io/badge/GitHub_Actions-D9F3E7?style=for-the-badge&logo=githubactions&logoColor=1F7350" alt="GitHub Actions"></a>
</p>

</div>

<details dir="rtl">
<summary><b>📂 מבנה הפרויקט</b></summary>

```
├── manifest.json          ההגדרות וההרשאות של התוסף
├── src/
│   ├── background.js      service worker: טיימר, התראות, חוקי חסימה, הודעות
│   ├── logic.js           פונקציות טהורות: דומיינים, חוקים, שלבים, זמן (עם בדיקות)
│   ├── popup/             החלון הקופץ: טיימר, אתרים, נתונים
│   ├── blocked/           הדף שמופיע באתר חסום
│   └── icons/             הלוגו ב־SVG וב־PNG
├── tests/logic.test.js    בדיקות יחידה עם node:test
├── docs/                  תמונות וכותרות מונפשות ל־README
└── .github/workflows/     CI שמריץ את הבדיקות בכל דחיפה
```
</details>

<div dir="rtl">

<a name="privacy"></a>
<p align="center"><a href="#contact"><img src="docs/readme/privacy-he.svg" width="100%" alt="פרטיות"></a></p>

<p align="center">
  בלי חשבונות, בלי שרתים ובלי מעקב. האתרים, ההגדרות והנתונים נשמרים רק ב־<code>chrome.storage</code> אצלך במחשב.<br>
  FocusBloom אף פעם לא קורא את הדפים שנכנסים אליהם. כרום עושה את החסימה לפי החוקים שהתוסף נותן לו.
</p>

<a name="contact"></a>
<p align="center"><a href="https://www.linkedin.com/in/noya-adivi/"><img src="docs/readme/footer-he.svg" width="100%" alt="נבנה על ידי נויה אדיבי"></a></p>

<p align="center">
  <a href="https://www.linkedin.com/in/noya-adivi/"><img src="https://img.shields.io/badge/LinkedIn-DAD5FF?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iIzU1NDhDOCIgZD0iTTIwLjQ1IDIwLjQ1aC0zLjU2di01LjU3YzAtMS4zMy0uMDMtMy4wNC0xLjg1LTMuMDQtMS44NiAwLTIuMTQgMS40NS0yLjE0IDIuOTR2NS42N0g5LjM1VjloMy40MXYxLjU2aC4wNWMuNDgtLjkgMS42NC0xLjg1IDMuMzctMS44NSAzLjYgMCA0LjI3IDIuMzcgNC4yNyA1LjQ2djYuMjh6TTUuMzQgNy40M2EyLjA2IDIuMDYgMCAxIDEgMC00LjEzIDIuMDYgMi4wNiAwIDAgMSAwIDQuMTN6TTcuMTIgMjAuNDVIMy41NlY5aDMuNTZ2MTEuNDV6TTIyLjIyIDBIMS43N0MuNzkgMCAwIC43NyAwIDEuNzN2MjAuNTRDMCAyMy4yMy43OSAyNCAxLjc3IDI0aDIwLjQ1Yy45OCAwIDEuNzgtLjc3IDEuNzgtMS43M1YxLjczQzI0IC43NyAyMy4yIDAgMjIuMjIgMHoiLz48L3N2Zz4=" alt="LinkedIn"></a>
  <a href="https://noyaadivi.github.io/noya-website"><img src="https://img.shields.io/badge/תיק_עבודות-D9F3E7?style=for-the-badge&logo=githubpages&logoColor=1F7350" alt="תיק עבודות"></a>
  <a href="https://github.com/NoyaAdivi/Okeat"><img src="https://img.shields.io/badge/גם_Okeat-FFD5C9?style=for-the-badge&logo=github&logoColor=A8483A" alt="גם Okeat"></a>
  <a href="https://github.com/NoyaAdivi"><img src="https://img.shields.io/badge/עוד_פרויקטים-FBD5E0?style=for-the-badge&logo=github&logoColor=A03A5C" alt="עוד פרויקטים"></a>
</p>

</div>
