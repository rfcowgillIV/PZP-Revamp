# Security & Bug-Fix Update — October 2026

Everything changed in the `security-updates-2026` branch, and why.

## 1. Outdated browser libraries with known vulnerabilities

| Library | Was | Now | Why |
|---|---|---|---|
| jQuery | 3.2.1 | 3.7.1 | Cross-site scripting (XSS) bugs CVE-2019-11358, CVE-2020-11022, CVE-2020-11023 |
| Bootstrap (CSS + JS) | 4.0.0-**beta** | 4.6.2 | XSS bugs CVE-2018-14040, CVE-2018-14041, CVE-2018-14042, CVE-2019-8331. A beta was never meant for a live site anyway. |
| Popper.js | 1.11.0 | 1.16.1 | The version Bootstrap 4.6.2 expects |

All three now load from jsDelivr with `integrity="sha384-…"` hashes. The hashes were computed
from the official releases on GitHub, so the browser refuses a file if the CDN copy is ever
tampered with. The site stays on Bootstrap 4 so the existing layout keeps working.

## 2. Reverse tabnabbing

The "Reimagined By Party Zone! Productions" link opens a new tab with `target="_blank"`. Without
`rel="noopener noreferrer"`, the newly opened page can quietly redirect the original tab to a fake
site. The `rel` attribute was added.

## 3. Inline JavaScript moved to `app.js`

The smooth-scroll code moved out of an inline `<script>` at the bottom of `index.html` into the
(previously empty) `app.js`. Separating scripts from HTML is what lets a site turn on a
Content-Security-Policy that blocks injected scripts.

## 4. Bugs fixed

- `#schedulebutton` had two click handlers (one by id, one by its `schedule` class), so every
  click started two scroll animations. It now has one.
- The file ended with a duplicate `</body></html>`.
- Each scroll handler now checks that its section exists before scrolling.

## 5. How to check it

Open `index.html` in a browser and click each navbar link: it should glide smoothly to its
section. On a phone-width window, the hamburger menu should open and close. If a Bootstrap
component looks off after the beta → 4.6.2 jump, compare against
https://getbootstrap.com/docs/4.6/ (the only class names that changed after the beta were minor
utility names).

## 6. Not changed

The external links to `pzpentertainment.com` and `louisvilleweddingshows.net` still use
`http://`. Switch them to `https://` if those sites support it.

## Ongoing protection (added later in October 2026)

- **`SECURITY.md`** tells people how to report a security problem privately instead of in a public issue. For the "Report a vulnerability" button to appear, turn on **Settings → Code security → Private vulnerability reporting**.
- **CodeQL code scanning** (`.github/workflows/codeql.yml`): GitHub's free scanner checks the code for security bugs on every push and pull request to `master`, and weekly. Results appear under **Security → Code scanning**. Dependabot also keeps the workflow's own tools updated.
