document.addEventListener("DOMContentLoaded", function () {

  const searchToggle = document.getElementById("search-toggle");
  const searchContainer = document.getElementById("search-container");
  const searchInput = document.getElementById("search-input");

  /* Toggle Search */
  if (searchToggle && searchContainer) {
    searchToggle.addEventListener("click", function () {
      searchContainer.classList.toggle("active");

      if (searchContainer.classList.contains("active")) {
        searchInput.focus();
      }
    });
  }

  /* Card click navigation */
  const cards = document.querySelectorAll(".tool-card");
  cards.forEach(card => {
    card.addEventListener("click", function () {
      window.location.href = this.dataset.url;
    });

    card.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        window.location.href = this.dataset.url;
      }
    });
  });

  /* Filtering */
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

});
