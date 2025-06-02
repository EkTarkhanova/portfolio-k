document.addEventListener("DOMContentLoaded", () => {
  fetch("data/disciplines.json")
    .then((response) => response.json())
    .then((data) => renderCards(data));

  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modal-title");
  const modalDescription = document.getElementById("modal-description");
  const modalLinks = document.getElementById("modal-links");
  const modalClose = document.getElementById("modal-close");

  modalClose.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });

  function renderCards(modules) {
    const container = document.getElementById("cards-container");
    container.innerHTML = "";

    modules.forEach((module) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `<h3>${module.title}</h3><p>${module.description || ""}</p>`;

      card.addEventListener("click", () => {
        modalTitle.textContent = module.title;
        modalDescription.textContent = module.description || "";
        modalLinks.innerHTML = "";

        module.disciplines.forEach((discipline) => {
          const item = document.createElement("li");
          item.classList.add("discipline-item");

          if (discipline.labs && discipline.labs.length > 0) {
            // Заголовок дисциплины
            const title = document.createElement("span");
            title.textContent = discipline.title;
            title.classList.add("clickable");

            // Контейнер для лабораторок
            const labsList = document.createElement("ul");
            labsList.classList.add("labs-list", "hidden");

            discipline.labs.forEach((lab) => {
              const labItem = document.createElement("li");
              labItem.innerHTML = `<a href="${lab.url}" target="_blank">${lab.title}</a>`;
              labsList.appendChild(labItem);
            });

            title.addEventListener("click", () => {
              labsList.classList.toggle("hidden");
            });

            item.appendChild(title);
            item.appendChild(labsList);
          } else if (discipline.url) {
            item.innerHTML = `<a href="${discipline.url}" target="_blank">${discipline.title}</a>`;
          } else {
            item.textContent = discipline.title;
          }

          modalLinks.appendChild(item);
        });

        modal.classList.remove("hidden");
      });

      container.appendChild(card);
    });
  }
});
