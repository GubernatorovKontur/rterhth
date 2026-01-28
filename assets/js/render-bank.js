// Рендер банка инициатив из data/bank-ideas.json

const BANK_DATA_URL = "data/bank-ideas.json";

function renderBankIdeas(items) {
  const container = document.getElementById("bank-list");
  if (!container) return;

  if (!items || items.length === 0) {
    container.innerHTML =
      '<p class="small">Пока здесь пусто. Как только инициативы попадут в банк, они появятся на этой странице.</p>';
    return;
  }

  const list = document.createElement("div");
  items.forEach(function (item) {
    const card = document.createElement("div");
    card.className = "card";

    const title = document.createElement("strong");
    title.textContent = item.title || "Инициатива без названия";

    const meta = document.createElement("p");
    meta.className = "small";
    const status = item.status || "unknown";
    const author = item.author || "Автор не указан";
    const unit = item.unit || "";
    meta.textContent = `Статус: ${status}. Автор: ${author}${unit ? " · " + unit : ""}`;

    const desc = document.createElement("p");
    desc.className = "small";
    desc.textContent = item.shortDescription || "";

    card.appendChild(title);
    card.appendChild(meta);
    card.appendChild(desc);

    if (item.link) {
      const link = document.createElement("a");
      link.href = item.link;
      link.textContent = "Подробнее";
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

fetch(BANK_DATA_URL)
  .then(function (res) {
    if (!res.ok) throw new Error("Failed to load bank ideas");
    return res.json();
  })
  .then(function (data) {
    renderBankIdeas(data);
  })
  .catch(function () {
    const container = document.getElementById("bank-list");
    if (!container) return;
    container.innerHTML =
      '<p class="small">Не удалось загрузить банк инициатив. Попробуйте обновить страницу позже.</p>';
  });

