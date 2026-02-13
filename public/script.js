document.addEventListener("DOMContentLoaded", async function () {
  const postGrid = document.getElementById("post-grid");
  const searchInput = document.getElementById("search-input");

  async function fetchTools() {
    try {
      const res = await fetch("/api/tools");
      const tools = await res.json();
      renderTools(tools);
    } catch (err) {
      console.error("Failed to load tools", err);
    }
  }

  function renderTools(tools) {
    postGrid.innerHTML = "";

    tools.forEach(tool => {
      const card = document.createElement("div");
      card.className = "tool-card";

      card.innerHTML = `
        <div>
          <h3>${tool.title}</h3>
          <p>Professional AI-powered ${tool.title} tool.</p>
        </div>
        <a href="/tool/${tool.slug}" class="action-btn">
          Generate
        </a>
      `;

      postGrid.appendChild(card);
    });
  }

  searchInput.addEventListener("input", function () {
    const term = this.value.toLowerCase();
    const cards = document.querySelectorAll(".tool-card");

    cards.forEach(card => {
      const title = card.querySelector("h3").innerText.toLowerCase();
      card.style.display = title.includes(term) ? "flex" : "none";
    });
  });

  fetchTools();
});
