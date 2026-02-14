document.addEventListener("DOMContentLoaded", function () {

  /* SEARCH TOGGLE */
  const searchToggle = document.getElementById("search-toggle");
  const searchContainer = document.getElementById("search-container");
  const searchInput = document.getElementById("search-input");

  if (searchToggle && searchContainer) {
    searchToggle.addEventListener("click", function () {
      searchContainer.classList.toggle("active");
      if (searchContainer.classList.contains("active")) {
        searchInput.focus();
      }
    });
  }

  /* SETTINGS TOGGLE */
const settingsToggle = document.getElementById("settings-toggle");
const settingsPanel = document.getElementById("settings-panel");

if (settingsToggle && settingsPanel) {
  settingsToggle.addEventListener("click", () => {
    settingsPanel.classList.toggle("active");
  });
}

  /* CARD CLICK */
  const cards = document.querySelectorAll(".tool-card");
  cards.forEach(card => {
    card.addEventListener("click", () => {
      window.location.href = card.dataset.url;
    });

    card.addEventListener("keypress", e => {
      if (e.key === "Enter") {
        window.location.href = card.dataset.url;
      }
    });
  });

  /* CATEGORY + SEARCH FILTER */
  const categoryButtons = document.querySelectorAll(".pill");
  let activeCategory = "All Tools";

  function filter() {
    if (!searchInput) return;
    const term = searchInput.value.toLowerCase();

    cards.forEach(card => {
      const title = card.dataset.title;
      const category = card.dataset.category;

      const matchSearch = title.includes(term);
      const matchCategory =
        activeCategory === "All Tools" ||
        category === activeCategory;

      card.style.display =
        matchSearch && matchCategory ? "flex" : "none";
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", filter);
  }

  categoryButtons.forEach(btn => {
    btn.addEventListener("click", function () {
      categoryButtons.forEach(b => b.classList.remove("active"));
      this.classList.add("active");
      activeCategory = this.innerText.trim();
      filter();
    });
  });

  /* DARK MODE */
  const darkModeToggle = document.getElementById("dark-mode-toggle");

  function applyTheme(mode) {
    if (mode === "light") {
      document.body.classList.add("light-mode");
      if (darkModeToggle) darkModeToggle.checked = false;
    } else {
      document.body.classList.remove("light-mode");
      if (darkModeToggle) darkModeToggle.checked = true;
    }
  }

  const savedTheme = localStorage.getItem("theme") || "dark";
  applyTheme(savedTheme);

  if (darkModeToggle) {
    darkModeToggle.addEventListener("change", () => {
      if (darkModeToggle.checked) {
        localStorage.setItem("theme", "dark");
        applyTheme("dark");
      } else {
        localStorage.setItem("theme", "light");
        applyTheme("light");
      }
    });
  }

});
