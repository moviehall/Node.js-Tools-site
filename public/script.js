document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("search-input");
  const cards = document.querySelectorAll(".tool-card");
  const categoryButtons = document.querySelectorAll(".pill");

  let activeCategory = "All Tools";

  /* CARD CLICK NAVIGATION */
  cards.forEach(card => {
    card.addEventListener("click", function () {
      const url = this.dataset.url;
      window.location.href = url;
    });
  });

  function filter() {
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

  searchInput.addEventListener("input", filter);

  categoryButtons.forEach(btn => {
    btn.addEventListener("click", function () {
      categoryButtons.forEach(b => b.classList.remove("active"));
      this.classList.add("active");
      activeCategory = this.innerText.trim();
      filter();
    });
  });
});
