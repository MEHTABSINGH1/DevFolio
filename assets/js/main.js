/* ============================================================
   DevFolio — main.js
   Vanilla JavaScript. No libraries.
   Handles: theme toggle, mobile nav, active links, scroll
   reveal, header shadow, project filtering, form validation.
   ============================================================ */

(function () {
  "use strict";

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Theme toggle (persisted) ---------- */
  const themeToggle = document.getElementById("themeToggle");
  const root = document.documentElement;
  const savedTheme = localStorage.getItem("devfolio-theme");

  if (savedTheme) {
    root.setAttribute("data-theme", savedTheme);
    updateThemeIcon(savedTheme);
  } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
    root.setAttribute("data-theme", "light");
    updateThemeIcon("light");
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      const isLight = root.getAttribute("data-theme") === "light";
      const next = isLight ? "dark" : "light";
      if (next === "dark") {
        root.removeAttribute("data-theme");
      } else {
        root.setAttribute("data-theme", "light");
      }
      localStorage.setItem("devfolio-theme", next);
      updateThemeIcon(next);
    });
  }

  function updateThemeIcon(theme) {
    const icon = themeToggle && themeToggle.querySelector(".theme-icon");
    if (icon) icon.textContent = theme === "light" ? "☀️" : "🌙";
  }

  /* ---------- Mobile nav ---------- */
  const navToggle = document.getElementById("navToggle");
  const siteNav = document.getElementById("siteNav");

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", function () {
      const open = siteNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(open));
    });
    // close menu when a link is clicked (mobile)
    siteNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        siteNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Active nav link (based on current file) ---------- */
  const path = window.location.pathname.split("/").pop() || "index.html";
  const map = { "index.html": "home", "about.html": "about", "projects.html": "projects", "contact.html": "contact", "": "home" };
  const current = map[path] || "home";
  document.querySelectorAll(".site-nav a[data-page]").forEach(function (link) {
    if (link.getAttribute("data-page") === current) link.classList.add("active");
  });

  /* ---------- Header shadow on scroll ---------- */
  const header = document.getElementById("siteHeader");
  if (header) {
    const onScroll = function () {
      header.classList.toggle("scrolled", window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Scroll reveal (IntersectionObserver) ---------- */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("visible"); });
  }

  /* ---------- Project filtering ---------- */
  const filterBtns = document.querySelectorAll(".filter-btn");
  const grid = document.getElementById("projectGrid");
  const emptyState = document.getElementById("emptyState");

  if (filterBtns.length && grid) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        filterBtns.forEach(function (b) { b.classList.remove("is-active"); });
        btn.classList.add("is-active");

        const filter = btn.getAttribute("data-filter");
        const cards = grid.querySelectorAll(".project-card");
        let shown = 0;

        cards.forEach(function (card) {
          const match = filter === "all" || card.getAttribute("data-category") === filter;
          card.style.display = match ? "" : "none";
          if (match) shown++;
        });

        if (emptyState) emptyState.hidden = shown !== 0;
      });
    });
  }

  /* ---------- Contact form validation ---------- */
  const form = document.getElementById("contactForm");
  if (form) {
    const success = document.getElementById("formSuccess");

    const validators = {
      name: function (v) { return v.trim().length >= 2 ? "" : "Please enter your name."; },
      email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? "" : "Please enter a valid email."; },
      message: function (v) { return v.trim().length >= 10 ? "" : "Message should be at least 10 characters."; }
    };

    function validateField(field) {
      const input = form.elements[field];
      const wrap = input.closest(".field");
      const errorEl = form.querySelector('.error[data-for="' + field + '"]');
      const msg = validators[field](input.value);
      if (errorEl) errorEl.textContent = msg;
      if (wrap) wrap.classList.toggle("invalid", Boolean(msg));
      return !msg;
    }

    Object.keys(validators).forEach(function (field) {
      const input = form.elements[field];
      input.addEventListener("blur", function () { validateField(field); });
      input.addEventListener("input", function () {
        const wrap = input.closest(".field");
        if (wrap && wrap.classList.contains("invalid")) validateField(field);
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const results = Object.keys(validators).map(validateField);
      const allValid = results.every(Boolean);
      if (allValid) {
        if (success) success.hidden = false;
        form.reset();
        setTimeout(function () { if (success) success.hidden = true; }, 5000);
      }
    });
  }
})();
