// --- Подсветка активной ссылки в меню по текущей секции ---
const navLinks = [...document.querySelectorAll(".nav__link")];
const sections = navLinks.map((link) =>
  document.querySelector(link.getAttribute("href")),
);

function updateActiveLink() {
  const line = window.innerHeight * 0.4;
  let activeIndex = 0;

  sections.forEach((section, index) => {
    if (section.getBoundingClientRect().top <= line) activeIndex = index;
  });

  // В самом низу страницы всегда подсвечиваем последний пункт
  const isPageBottom =
    window.innerHeight + window.scrollY >= document.body.scrollHeight - 4;
  if (isPageBottom) activeIndex = sections.length - 1;

  navLinks.forEach((link, index) => {
    link.classList.toggle("nav__link--active", index === activeIndex);
  });
}

window.addEventListener("scroll", updateActiveLink, { passive: true });
updateActiveLink();

// --- Отправка формы (заглушка: данные никуда не уходят) ---
const form = document.getElementById("contact-form");
const success = document.getElementById("contact-success");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  form.classList.add("form--hidden");
  success.classList.add("contact__success--visible");
});

// --- Мобильное меню ---
const header = document.querySelector(".site-header");
const nav = document.getElementById("site-nav");
const burger = document.querySelector(".burger");

function setMenu(open) {
  nav.classList.toggle("nav--open", open);
  burger.classList.toggle("burger--open", open);
  burger.setAttribute("aria-expanded", String(open));
  burger.setAttribute("aria-label", open ? "Закрыть меню" : "Открыть меню");
}

burger.addEventListener("click", () =>
  setMenu(!nav.classList.contains("nav--open")),
);

// Закрываем после выбора пункта
nav.addEventListener("click", (e) => {
  if (e.target.closest("a")) setMenu(false);
});

// Закрываем по тапу вне шапки и по Esc
document.addEventListener("click", (e) => {
  if (!header.contains(e.target)) setMenu(false);
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") setMenu(false);
});

// Сбрасываем состояние при переходе на десктопную ширину
window
  .matchMedia("(min-width: 901px)")
  .addEventListener("change", (e) => e.matches && setMenu(false));
