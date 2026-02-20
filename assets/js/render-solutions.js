// Рендер магазина готовых решений из data/solutions-store.json
// Три раздела: Кейсы МРЦ, Лайфхаки МРЦ, Наработки Лаборатории. Раскрываемые плашки.

const SOLUTIONS_DATA_URL = "data/solutions-store.json";

const SECTION_IDS = {
  case_mrc: "solutions-case-mrc",
  lifehack_mrc: "solutions-lifehack-mrc",
  our_developments: "solutions-our-developments"
};

function renderExpandableCard(item, container) {
  const card = document.createElement("div");
  card.className = "solution-card card";
  card.setAttribute("data-id", item.id);

  const shortText = item.shortDescription || item.essence || item.name || "—";
  const details = [
    { label: "Предпосылки", value: item.preconditions },
    { label: "Суть решения", value: item.essence || item.shortDescription },
    { label: "Основные этапы", value: item.stages },
    { label: "Результаты", value: item.results },
    { label: "Срок внедрения", value: item.implementationPeriod },
    { label: "Масштабирование", value: item.scaling }
  ].filter(function (d) { return d.value && String(d.value).trim(); });

  const header = document.createElement("button");
  header.type = "button";
  header.className = "solution-card-header";
  header.setAttribute("aria-expanded", "false");
  header.setAttribute("aria-controls", "solution-details-" + item.id);

  const title = document.createElement("strong");
  title.textContent = item.name || "Решение без названия";
  title.className = "solution-card-title";

  const summary = document.createElement("p");
  summary.className = "small solution-card-summary";
  summary.textContent = shortText;

  const toggleIcon = document.createElement("span");
  toggleIcon.className = "solution-card-toggle";
  toggleIcon.setAttribute("aria-hidden", "true");
  toggleIcon.textContent = "▼";

  header.appendChild(title);
  header.appendChild(summary);
  header.appendChild(toggleIcon);

  const body = document.createElement("div");
  body.id = "solution-details-" + item.id;
  body.className = "solution-card-body";
  body.hidden = true;

  if (details.length > 0) {
    details.forEach(function (d) {
      const block = document.createElement("div");
      block.className = "solution-detail-block";
      const labelEl = document.createElement("strong");
      labelEl.className = "small";
      labelEl.textContent = d.label + ": ";
      const valueEl = document.createElement("span");
      valueEl.className = "small";
      valueEl.style.whiteSpace = "pre-wrap";
      valueEl.textContent = d.value;
      block.appendChild(labelEl);
      block.appendChild(valueEl);
      body.appendChild(block);
    });
  } else {
    const empty = document.createElement("p");
    empty.className = "small";
    empty.textContent = "Дополнительная информация пока не добавлена.";
    body.appendChild(empty);
  }

  if (item.links && item.links.length > 0) {
    const linksBlock = document.createElement("div");
    linksBlock.className = "solution-detail-block solution-links";
    item.links.forEach(function (link) {
      const a = document.createElement("a");
      a.href = link.url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.className = "btn btn-ghost small";
      a.style.marginRight = "8px";
      a.textContent = link.title + " →";
      linksBlock.appendChild(a);
    });
    body.appendChild(linksBlock);
  }

  if (item.docsLink && (!item.links || item.links.length === 0)) {
    const a = document.createElement("a");
    a.href = item.docsLink;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.className = "btn btn-ghost small";
    a.textContent = "Подробнее о решении →";
    body.appendChild(a);
  }

  header.addEventListener("click", function () {
    const expanded = header.getAttribute("aria-expanded") === "true";
    header.setAttribute("aria-expanded", !expanded);
    body.hidden = expanded;
    toggleIcon.textContent = expanded ? "▼" : "▲";
    card.classList.toggle("is-expanded", !expanded);
  });

  card.appendChild(header);
  card.appendChild(body);
  container.appendChild(card);
}

function renderSection(items, sectionId) {
  const container = document.getElementById(sectionId);
  if (!container) return;

  container.innerHTML = "";
  if (!items || items.length === 0) {
    container.innerHTML = '<p class="small">Пока нет решений в этом разделе.</p>';
    return;
  }

  const list = document.createElement("div");
  list.className = "solutions-cards-list";
  items.forEach(function (item) {
    renderExpandableCard(item, list);
  });
  container.appendChild(list);
}

document.addEventListener("DOMContentLoaded", function () {
  fetch(SOLUTIONS_DATA_URL)
    .then(function (res) {
      if (!res.ok) throw new Error("Failed to load solutions");
      return res.json();
    })
    .then(function (data) {
      const byType = {
        case_mrc: data.filter(function (item) { return item.solutionType === "case_mrc"; }),
        lifehack_mrc: data.filter(function (item) { return item.solutionType === "lifehack_mrc"; }),
        our_developments: data.filter(function (item) { return item.solutionType === "our_developments"; })
      };

      renderSection(byType.case_mrc, SECTION_IDS.case_mrc);
      renderSection(byType.lifehack_mrc, SECTION_IDS.lifehack_mrc);
      renderSection(byType.our_developments, SECTION_IDS.our_developments);
    })
    .catch(function () {
      ["solutions-case-mrc", "solutions-lifehack-mrc", "solutions-our-developments"].forEach(function (id) {
        const el = document.getElementById(id);
        if (el) {
          el.innerHTML = '<p class="small">Не удалось загрузить данные. Обновите страницу позже.</p>';
        }
      });
    });
});
