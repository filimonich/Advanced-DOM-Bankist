'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector(`.btn--scroll-to`);
const section1 = document.querySelector(`#section--1`);

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  // предотвращение прокрутки страницы в самый верх, при нажатии на кнопку логина
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);
// Аналог записи сверху
// Подключение кнопки в нижнем колонтитуле
btnsOpenModal.forEach(btn => btn.addEventListener(`click`, openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

/////////////////////////////////////////////////////////////////
// 188 Implementing Smooth Scrolling // Реализация плавной прокрутки
// Кнопка скрола
btnScrollTo.addEventListener(`click`, function (e) {
  const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords);

  // console.log(e.target.getBoundingClientRect());

  // console.log(`Current scroll (X/Y)`, window.pageXOffset, window.pageYOffset);

  // console.log(
  //   `height/width viewport`,
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );

  // Scrolling
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: `smooth`,
  // });

  section1.scrollIntoView({ behavior: `smooth` });
});

///////////////////////////////////////
// Page navigation // постраничная новигация

// document.querySelectorAll(`.nav__link`).forEach(function (el) {
//   // Функция обратного высзова в функ. обрат. вызова
//   el.addEventListener(`click`, function (e) {
//     e.preventDefault();
//     const id = this.getAttribute(`href`);
//     console.log(id); // в зависимости от элемента, на который нажали // #section--3
//     document.querySelector(id).scrollIntoView({ behavior: `smooth` });
//   });
// });

// Делегирования событий
// 1. Добавить слушателя событий к общему родительскому элементу // Add event listener to common parent element
// 2. Определить, какой элемент вызвал событие // Determine what element originated the event

document.querySelector(`.nav__links`).addEventListener(`click`, function (e) {
  e.preventDefault();
  // Стратегия подбора
  // проверка, содеражит ли целевой элемент класс, который указан в параметре
  if (e.target.classList.contains(`nav__link`)) {
    const id = e.target.getAttribute(`href`);
    document.querySelector(id).scrollIntoView({ behavior: `smooth` });
  }
});

// Компонент кладок
const tabs = document.querySelectorAll(`.operations__tab`);
const tabsContainers = document.querySelector(`.operations__tab-container`);
const tabsContent = document.querySelectorAll(`.operations__content`);

// tabs.forEach(t => t.addEventListener(`click`, () => console.log(`TAB`))); // Так делать нельзя // замедляет страницу, если будет много вкладок, получится копия для каждой вкладки
// Используем делегирование событий // Для этого метода важно прекреплять обработчик  событий на общем родительском элементе
tabsContainers.addEventListener(`click`, function (e) {
  // Обнаруживается ближайшая вкладка операции(на котторую нажали)
  // Метод Element.closest() возвращает ближайший родительский элемент (или сам элемент)
  const clicked = e.target.closest(`.operations__tab`);
  // console.log(clicked);
  // Guard clause // защитная оговорка
  // игнорирование щелчков вне области `.operations__tab` // когда есть Null(ошибка), то !clicked значение станет истеннной и последующий код не будет выполнен, если clicked тру, то возврат не будет выполнен и последующий код будет выполнен
  if (!clicked) return;

  // Удалить активный класс
  tabs.forEach(t => t.classList.remove(`operations__tab--active`));
  tabsContent.forEach(c => c.classList.remove(`operations__content--active`));

  // Активная вкладка
  clicked.classList.add(`operations__tab--active`);

  // Активировать область содержимого
  // console.log(clicked.dataset.tab);
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add(`operations__content--active`);
});

/////////////////////////////////////////////////////////////
// Выбор, создание и удаление элементов
const header = document.querySelector(`.header`);

const message = document.createElement(`div`);
message.classList.add(`cookie-message`);
// message.textContent = `We use cookied for improved functionalyty and analytics`;
message.innerHTML = `We use cookied for improved functionalyty and analytics. <buttton class="btn btn--close-cookie">Got it!</button>`;

// Метод Element.prepend()вставляет набор Nodeобъектов или строковых объектов перед первым дочерним элементом Element. Строковые объекты вставляются как эквивалентные Text узлы.
// header.prepend(message);
// Метод Element.append() вставляет узлы или строки с текстом в конец Element. Строки с текстом вставляются как текстовое содержимое.
header.append(message);

// Delete elements
document
  .querySelector(`.btn--close-cookie`)
  .addEventListener(`click`, function () {
    // message.remove();
    message.parentElement.removeChild(message);
  });

message.style.backgroundColor = `#37383d`;
message.style.width = `103%`;

// Изменение цвета
document.documentElement.style.setProperty(`--color-primary`, `orangered`);

// изменение размера
message.style.height =
  Number.parseFloat(getComputedStyle(message).height) + 40 + `px`;
