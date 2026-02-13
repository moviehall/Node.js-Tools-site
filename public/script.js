document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("search-input");
  const cards = document.querySelectorAll(".tool-card");

  searchInput.addEventListener("input", function () {
    const term = this.value.toLowerCase();

    cards.forEach(card => {
      const title = card.dataset.title;
      card.style.display = title.includes(term) ? "flex" : "none";
    });
  });
});
