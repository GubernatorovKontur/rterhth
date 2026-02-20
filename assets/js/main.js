// Основные URL-ы (заглушки, заменить на реальные из LAB при интеграции)
const URLS = {
  staffFormSandbox: "https://staff.skbkontur.ru/survey/68d0339e9b2c0d870f51e367", // Как подать инициативу
  bankIdeas: "bank.html", // Страница «Банк инициатив» на сайте
  readySolutions: "solutions.html", // Магазин готовых решений на сайте
  wikiLab: "#", // Wiki/пространство LAB (подставить реальную ссылку)
  contactCoordinatorMailto: "mailto:lab-coordinator@skbkontur.ru" // пример
};

function smoothScrollTo(target) {
  const el = document.querySelector(target);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

// Общий обработчик для data-scroll
document.addEventListener("click", function (e) {
  const btn = e.target.closest("[data-scroll]");
  if (!btn) return;
  const target = btn.getAttribute("data-scroll");
  if (target) {
    e.preventDefault();
    smoothScrollTo(target);

    // Специальная логика для разных входов
    const role = btn.getAttribute("data-role");
    if (role) {
      if (role.includes("employee")) {
        setWho("employee");
      }
      if (role.includes("customer")) {
        setWho("customer");
      }
    }
  }
});

// Кнопки "Каталог готовых решений" (если есть кнопки, а не ссылки)
const btnReadyHero = document.getElementById("btn-ready-solutions-hero");
if (btnReadyHero) {
  btnReadyHero.addEventListener("click", function() {
    if (URLS.readySolutions && URLS.readySolutions !== "#") {
      window.open(URLS.readySolutions, "_blank", "noopener");
    } else {
      alert("Здесь будет ссылка на Магазин готовых решений Центра экспертизы.");
    }
  });
}

// Ссылка на Банк инициатив
const linkBankIdeas = document.getElementById("link-bank-ideas");
if (linkBankIdeas) {
  linkBankIdeas.addEventListener("click", function (e) {
    if (URLS.bankIdeas && URLS.bankIdeas !== "#") {
      linkBankIdeas.href = URLS.bankIdeas;
    } else {
      e.preventDefault();
      alert("Здесь будет ссылка на Банк инициатив Лаборатории.");
    }
  });
}

// Ссылка на Wiki LAB
const linkWikiLab = document.getElementById("link-wiki-lab");
if (linkWikiLab) {
  linkWikiLab.addEventListener("click", function (e) {
    if (URLS.wikiLab && URLS.wikiLab !== "#") {
      linkWikiLab.href = URLS.wikiLab;
    } else {
      e.preventDefault();
      alert("Здесь будет ссылка на Wiki / пространство LAB.");
    }
  });
}

// Кнопка "Написать координатору" - теперь это обычная mailto ссылка, обработчик не нужен

// Карточки "С чем можно прийти" — теперь ссылки <a>, навигация нативная

// Переключатель "Кто вы?"
const whoTabs = document.getElementById("who-tabs");
const employeeForm = document.getElementById("employee-form");
const customerForm = document.getElementById("customer-form");

function setWho(who) {
  if (!whoTabs) return;
  const tabButtons = whoTabs.querySelectorAll(".tab");
  tabButtons.forEach(function (btn) {
    const value = btn.getAttribute("data-who");
    if (value === who) {
      btn.classList.add("tab-active");
    } else {
      btn.classList.remove("tab-active");
    }
  });
  if (employeeForm && customerForm) {
    if (who === "employee") {
      employeeForm.style.display = "";
      customerForm.style.display = "none";
    } else {
      employeeForm.style.display = "none";
      customerForm.style.display = "";
    }
  }
}

if (whoTabs) {
  whoTabs.addEventListener("click", function (e) {
    const btn = e.target.closest(".tab");
    if (!btn) return;
    const who = btn.getAttribute("data-who");
    if (who) {
      setWho(who);
    }
  });
}

// Кнопка "Продолжить подачу" (сотрудник)
const btnEmployeeContinue = document.getElementById("btn-employee-continue");
const employeeStatusMessage = document.getElementById("employee-status-message");
if (btnEmployeeContinue) {
  btnEmployeeContinue.addEventListener("click", function () {
    // Здесь можно позже добавить логику deeplink/предзаполнения.
    // Сейчас — просто открываем staff-форму и даём подсказку пользователю.
    if (employeeStatusMessage) {
      employeeStatusMessage.textContent =
        "Мы откроем форму Песочницы в новой вкладке. Перенеси туда главное: что это, польза, для кого и статус.";
    }
    if (URLS.staffFormSandbox) {
      window.open(URLS.staffFormSandbox, "_blank", "noopener");
    }
  });
}

// Кнопка "Отправить запрос" (заказчик)
const btnCustomerSubmit = document.getElementById("btn-customer-submit");
const customerStatusMessage = document.getElementById("customer-status-message");
if (btnCustomerSubmit) {
  btnCustomerSubmit.addEventListener("click", function () {
    // Заглушка: здесь будет отправка в Staff-опрос или внутренний сервис.
    // Сейчас просто показываем сообщение-симуляцию.
    const problem = document.getElementById("customer-problem").value.trim();
    const contact = document.getElementById("customer-contact").value.trim();
    if (!problem || !contact) {
      if (customerStatusMessage) {
        customerStatusMessage.textContent = "Пожалуйста, опиши задачу и укажи контакт для связи.";
      }
      return;
    }
    if (customerStatusMessage) {
      customerStatusMessage.textContent =
        "Запрос отправлен (эмуляция). В реальной версии здесь будет отправка в сервис заявок. " +
        "Мы зарегистрируем заявку, назначим ответственного и вернёмся в течение 3 рабочих дней.";
    }
  });
}

// Начальное состояние — ветка сотрудника
setWho("employee");

