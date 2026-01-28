// Рендер магазина готовых решений из data/solutions-store.json

const SOLUTIONS_DATA_URL = "data/solutions-store.json";

function renderSolutions(items) {
  const container = document.getElementById("solutions-list");
  if (!container) return;

  if (!items || items.length === 0) {
    container.innerHTML =
      '<p class="small">Пока готовых решений нет в витрине. По мере появления они будут отображаться здесь.</p>';
    return;
  }

  const list = document.createElement("div");
  items.forEach(function (item) {
    const card = document.createElement("div");
    card.className = "card";

    const title = document.createElement("strong");
    title.textContent = item.name || "Решение без названия";

    const meta = document.createElement("p");
    meta.className = "small";
    const category = item.category || "другое";
    const owner = item.owner || "Лаборатория";
    meta.textContent = `Категория: ${category}. Владелец: ${owner}.`;

    const desc = document.createElement("p");
    desc.className = "small";
    desc.textContent = item.shortDescription || "";

    card.appendChild(title);
    card.appendChild(meta);
    card.appendChild(desc);

    if (item.docsLink) {
      const link = document.createElement("a");
      link.href = item.docsLink;
      link.textContent = "Подробнее о решении";
      link.className = "small";
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      card.appendChild(link);
    }

    list.appendChild(card);
  });

  container.innerHTML = "";
  container.appendChild(list);
}

fetch(SOLUTIONS_DATA_URL)
  .then(function (res) {
    if (!res.ok) throw new Error("Failed to load solutions");
    return res.json();
  })
  .then(function (data) {
    renderSolutions(data);
  })
  .catch(function () {
    const container = document.getElementById("solutions-list");
    if (!container) return;
    container.innerHTML =
      '<p class="small">Не удалось загрузить магазин готовых решений. Попробуйте обновить страницу позже.</p>';
  });

