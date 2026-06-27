# Portfolio-13 v2.0 — Madhu Kumar Sikilammetla

A complete, unified personal portfolio site for an instructional designer & eLearning developer. **30+ pages** sharing one consistent design system, full dark/light theme support, working contact form, and dozens of interactive demos.

---

## 🚀 Quick Start

### 1. Deploy to GitHub Pages (5 minutes)
1. Push this folder to a GitHub repo (e.g. `Portfolio-13`)
2. Go to **Settings → Pages**
3. Source: **Deploy from a branch** → **main / root**
4. Save → site goes live at `https://<your-username>.github.io/Portfolio-13/`

### 2. Wire up the contact form (60 seconds)
The contact form uses **Web3Forms** — a free service that sends submissions to your email without a backend.

1. Visit **https://web3forms.com**
2. Enter your email → click **Create Access Key**
3. Copy the key (e.g. `abc12345-6789-defg-hijk-lmnopqrstuvw`)
4. Open `contact.html` → find `YOUR-WEB3FORMS-KEY-HERE` → replace with your key
5. Commit & push — done!

> Without a key, the form gracefully falls back to a `mailto:` link.

---

## 📁 File structure

```
Portfolio-13/
├── index.html               Home
├── about.html               About + journey timeline
├── work.html                12 selected projects (filterable)
├── services.html            Services + pricing tiers
├── process.html             5-stage process
├── contact.html             Working contact form
├── resources.html           9 free resources
│
├── articles.html            Blog/articles
├── faq.html                 12 FAQs (accordion)
├── glossary.html            32 eLearning terms (A–Z)
├── certifications.html      8 certifications
├── sitemap.html             All-pages index
├── buzz.html                Testimonials
├── accessibility-guide.html WCAG 2.1 AA guide
├── id-frameworks.html       6 ID frameworks
├── id-model-selector.html   Interactive 4-question quiz
├── ai-analyzer.html         Live readability analyzer
├── effort-estimator.html    Live dev-hours calculator
├── lms-demo.html            Tabbed LMS prototype
├── demo-storyboard.html     Storyboard example
├── demo-template.html       Course template showcase
├── demo-xapi.html           xAPI live statement viewer
├── sl-snippets.html         8 Storyline JS snippets
├── spot-the-bug.html        Interactive a11y exercise
├── case-study-aml.html      Banking case study
├── case-study-bees.html     K-8 case study
├── 404.html                 Custom not-found page
│
├── style.css                Unified design system
├── main.js                  All interactivity
└── README.md                This file
```

---

## 🎨 Design system

### Themes
- **Dark — Midnight Aurora** (default) — `#07090F` background, gold + indigo + teal accents
- **Light — Soft Lumen** — `#F7F8FC` background, deep indigo + gold accents, WCAG AA contrast

Themes persist across sessions via `localStorage`.

### Typography
- Headings: **Playfair Display** (serif)
- Body: **DM Sans**
- Code: **JetBrains Mono**

### Responsive breakpoints
Fully responsive at: 320 · 480 · 640 · 768 · 900 · 1024 · 1280 · 1600 · 1920 px
+ landscape phone media query (`max-height: 520px`)
+ touch-device adjustments (`hover: none`)
+ print styles

---

## ✨ Features

- ✅ Working contact form via Web3Forms (no backend needed)
- ✅ Dark & light theme toggle (saved in browser)
- ✅ Smooth scroll-reveal animations
- ✅ Mobile hamburger menu
- ✅ Scroll progress bar + back-to-top button
- ✅ Accessibility: skip-link, focus-visible rings, semantic HTML, ARIA
- ✅ Interactive AI readability analyzer
- ✅ Live ID-model selector quiz
- ✅ Live effort estimator
- ✅ Working xAPI statement demo
- ✅ LMS dashboard tab-switching demo
- ✅ Interactive "spot the bug" accessibility exercise
- ✅ `prefers-reduced-motion` & `prefers-color-scheme` respected
- ✅ Print-friendly stylesheet
- ✅ 100% vanilla — no build step, no frameworks, no npm

---

## 🎯 Customisation

| What | Where |
|---|---|
| Your name & logo | `index.html` (`<h1>`) + every page's `nav-logo` |
| Bio & photo | `about.html` |
| Projects | `work.html` + `index.html` (Featured Work section) |
| Services & pricing | `services.html` |
| Theme colors | `style.css` (`:root` and `[data-theme="light"]` blocks) |
| Email & social links | Footer in every page + `contact.html` |
| Web3Forms key | `contact.html` (hidden input `access_key`) |
| Favicon | Inline SVG data-URL in `<head>` of every page |

---

## 🛠 Tech stack

- HTML5 (semantic, accessible)
- CSS3 (custom properties, `clamp()`, `color-mix()`, grid, flex)
- Vanilla JS (no jQuery, no frameworks)
- Google Fonts (Playfair Display + DM Sans + JetBrains Mono)
- Web3Forms (email delivery — free tier)

---

## 📄 License

MIT — use it, fork it, customise it.

---

## 🙏 Credits

Designed & built by **Madhu Kumar Sikilammetla**.
- ✉️ madhukumar5290@gmail.com
- 🌐 https://github.com/madhukumar5290

Made with ☕, ❤️, and 12 years of L&D craft.
