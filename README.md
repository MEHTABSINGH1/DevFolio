# DevFolio — Orientation Showcase

A polished multi-page developer portfolio built with **plain HTML, CSS & JavaScript** — no frameworks, no build step. Used in the **Module 1 Orientation** (Whole-Game methodology) as the finished product students will build toward.

 

## ✨ Features
- **4 pages** — Home, About, Projects, Contact
- **Responsive** — mobile hamburger nav, fluid layouts (Flexbox + Grid)
- **Dark / light theme** toggle (saved in `localStorage`, respects system preference)
- **Scroll-reveal** animations (IntersectionObserver)
- **Project filtering** by category (vanilla JS)
- **Contact form** with live client-side validation
- **Accessible** — semantic HTML, skip link, ARIA labels, reduced-motion support
- **Zero dependencies** — only Google Fonts via CDN

## 📁 Folder structure
```
orientation-devfolio/
├── index.html          # Home / hero, skills, featured projects
├── about.html          # Bio, timeline, values
├── projects.html       # Filterable project grid
├── contact.html        # Contact info + validated form
├── assets/
│   ├── css/
│   │   └── styles.css  # All styles (design tokens, themes, responsive)
│   ├── js/
│   │   └── main.js     # Theme, nav, reveal, filter, form validation
│   └── images/         # (placeholders — thumbnails are CSS gradients)
├── netlify.toml        # Netlify config (static publish)
└── README.md
```

## ▶️ Run locally
No build needed. Either:
- Open `index.html` directly in a browser, **or**
- Serve it (recommended so paths behave like production):
  ```bash
  # Python
  python3 -m http.server 5173
  # then open http://localhost:5173
  ```

## 🚀 Deploy to Netlify
This is a static site — deploy in seconds.

**Option A — drag & drop:** go to app.netlify.com → "Add new site" → "Deploy manually" → drag the `orientation-devfolio` folder.

**Option B — Git:** push this folder to a GitHub repo, then in Netlify "Import from Git" and select it.
- **Build command:** *(leave empty)*
- **Publish directory:** `.` (the folder root — `netlify.toml` already sets this)

## 🛠️ Built with
HTML5 · CSS3 (custom properties, Flexbox, Grid) · Vanilla JavaScript (ES6) · Google Fonts (Poppins + Inter)
