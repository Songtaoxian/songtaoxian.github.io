(function () {
  var root = document.documentElement;
  var lang = localStorage.getItem("language") || root.getAttribute("lang") || "en";
  var theme = localStorage.getItem("theme") || root.getAttribute("data-theme") || "light";

  function renderIcons() {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  function applyLanguage(nextLang) {
    lang = nextLang;
    localStorage.setItem("language", lang);
    root.setAttribute("lang", lang);

    document.querySelectorAll("[data-en][data-zh]").forEach(function (element) {
      var text = element.getAttribute(lang === "zh" ? "data-zh" : "data-en");
      if (text) {
        element.textContent = text;
      }
    });

    var label = document.getElementById("lang-label");
    if (label) {
      label.textContent = lang === "zh" ? "CN" : "EN";
    }
  }

  function applyTheme(nextTheme) {
    theme = nextTheme;
    localStorage.setItem("theme", theme);
    root.setAttribute("data-theme", theme);

    document.querySelectorAll(".theme-toggle").forEach(function (button) {
      button.innerHTML = theme === "dark" ? '<i data-lucide="sun"></i>' : '<i data-lucide="moon"></i>';
    });
    renderIcons();
  }

  function revealSections() {
    var items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (item) {
        item.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 }
    );

    items.forEach(function (item) {
      observer.observe(item);
    });
  }

  document.querySelectorAll(".lang-toggle").forEach(function (button) {
    button.addEventListener("click", function () {
      applyLanguage(lang === "en" ? "zh" : "en");
    });
  });

  document.querySelectorAll(".theme-toggle").forEach(function (button) {
    button.addEventListener("click", function () {
      applyTheme(theme === "dark" ? "light" : "dark");
    });
  });

  document.querySelectorAll(".nav-toggle").forEach(function (button) {
    button.addEventListener("click", function () {
      var nav = document.querySelector(".site-nav");
      var isOpen = nav && nav.classList.toggle("is-open");
      button.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  });

  applyLanguage(lang);
  applyTheme(theme);
  revealSections();
  renderIcons();
})();
