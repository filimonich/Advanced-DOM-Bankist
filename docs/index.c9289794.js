const e=document.querySelector(".modal"),t=document.querySelector(".overlay"),o=document.querySelector(".btn--close-modal"),s=document.querySelectorAll(".btn--show-modal"),r=document.querySelector(".btn--scroll-to"),n=document.querySelector("#section--1"),c=document.querySelector(".nav"),a=document.querySelectorAll(".operations__tab"),i=document.querySelector(".operations__tab-container"),l=document.querySelectorAll(".operations__content"),d=document.querySelector(".header"),u=o=>{// предотвращение прокрутки страницы в самый верх, при нажатии на кнопку логина
o.preventDefault(),e.classList.remove("hidden"),t.classList.remove("hidden")},v=()=>{e.classList.add("hidden"),t.classList.add("hidden")};// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);
// Аналог записи сверху
// Подключение кнопки в нижнем колонтитуле
s.forEach(e=>e.addEventListener("click",u)),o.addEventListener("click",v),t.addEventListener("click",v),document.addEventListener("keydown",t=>{"Escape"!==t.key||e.classList.contains("hidden")||v()}),///////////////////////////////////////
// Implementing Smooth Scrolling // Реализация плавной прокрутки
// Кнопка скрола
r.addEventListener("click",e=>{n.getBoundingClientRect(),// console.log(s1coords);
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
n.scrollIntoView({behavior:"smooth"})}),///////////////////////////////////////
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
// 1. Добавить слушателя событий к общему родительскому элементу
// Add event listener to common parent element
// 2. Определить, какой элемент вызвал событие
// Determine what element originated the event
document.querySelector(".nav__links").addEventListener("click",e=>{// Стратегия подбора
// проверка, содеражит ли целевой элемент класс, который указан в параметре
if(e.preventDefault(),e.target.classList.contains("nav__link")){let t=e.target.getAttribute("href");document.querySelector(t).scrollIntoView({behavior:"smooth"})}}),///////////////////////////////////////
// create tab switching // создать переключение вкладок
// Так делать нельзя
// tabs.forEach(t => t.addEventListener(`click`, () => console.log(`TAB`)));
// замедляет страницу, если будет много вкладок, получится копия для каждой вкладки
// Используем делегирование событий // Для этого метода важно прекреплять обработчик
// событий на общем родительском элементе
i.addEventListener("click",e=>{// Обнаруживается ближайшая вкладка операции(на котторую нажали)
// Метод Element.closest() возвращает ближайший родительский элемент (или сам элемент)
let t=e.target.closest(".operations__tab");// console.log(clicked);
// Guard clause // защитная оговорка
// игнорирование щелчков вне области `.operations__tab`
// когда есть Null(ошибка), то !clicked значение станет истеннной
// и последующий код не будет выполнен, если clicked тру,
// то возврат не будет выполнен и последующий код будет выполнен
t&&(// Удалить активный класс
a.forEach(e=>e.classList.remove("operations__tab--active")),l.forEach(e=>e.classList.remove("operations__content--active")),// Активная вкладка
t.classList.add("operations__tab--active"),// Активировать область содержимого
// console.log(clicked.dataset.tab);
document.querySelector(`.operations__content--${t.dataset.tab}`).classList.add("operations__content--active"))});// Эффект затухания меню
const m=function(e){// const handleHover = e => {
// console.log(this, e.currentTarget);
// console.log(this);
if(e.target.classList.contains("nav__link")){let t=e.target,o=t.closest(".nav").querySelectorAll(".nav__link"),s=t.closest(".nav").querySelector("img");// Изменение прозрачности
o.forEach(e=>{e!==t&&(e.style.opacity=this)}),s.style.opacity=this}},_=c.getBoundingClientRect().height,y=new IntersectionObserver(e=>{let[t]=e;t.isIntersecting?c.classList.remove("sticky"):c.classList.add("sticky")},{root:null,threshold:0,rootMargin:`-${_}px`});y.observe(d);// Reveal sections // Раскрыть разделы
const h=document.querySelectorAll(".section"),L=new IntersectionObserver((e,t)=>{let[o]=e;o.isIntersecting&&(o.target.classList.remove("section--hidden"),t.unobserve(o.target))},{root:null,threshold:.15});h.forEach(e=>{L.observe(e),e.classList.add("section--hidden")});///////////////////////////////////////
// Lazy loading images // ленивая загрузка изображений
// выбираем все изображения, которые имеют свойство data-src(дэта сорс)
// const imgTargets = document.querySelectorAll(`img[data-src]`);
const g=document.querySelectorAll("img[srcset]"),b=new IntersectionObserver((e,t)=>{let[o]=e;o.isIntersecting&&(// Replace src with data-src // Заменить src на data-src
o.target.src=o.target.dataset.src,o.target.addEventListener("load",()=>{o.target.classList.remove("lazy-img")}),t.unobserve(o.target))},{root:null,threshold:0,rootMargin:"200px"});g.forEach(e=>b.observe(e)),(()=>{let e=document.querySelectorAll(".slide"),t=document.querySelector(".slider__btn--left"),o=document.querySelector(".slider__btn--right"),s=document.querySelector(".dots"),r=0,n=e.length,c=e=>{document.querySelectorAll(".dots__dot").forEach(e=>e.classList.remove("dots__dot--active")),document.querySelector(`.dots__dot[data-slide="${e}"]`).classList.add("dots__dot--active")},a=t=>{e.forEach((e,o)=>e.style.transform=`translateX(${100*(o-t)}%)`)},i=()=>{r===n-1?r=0:r++,a(r),c(r)},l=()=>{0===r?r=n-1:r--,a(r),c(r)};a(0),e.forEach((e,t)=>{s.insertAdjacentHTML("beforeend",`<button class="dots__dot" data-slide="${t}"></button>`)}),c(0),// Event handlers
o.addEventListener("click",i),t.addEventListener("click",l),document.addEventListener("keydown",e=>{"ArrowLeft"===e.key&&l(),"ArrowRight"===e.key&&i()}),s.addEventListener("click",e=>{if(e.target.classList.contains("dots__dot")){let{slide:t}=e.target.dataset;a(t),c(t)}})})(),///////////////////////////////////////
// // Передача "аргумента" в обработчик
// Событие mouseover запускается, Element когда указывающее устройство
// (например, мышь или трекпад) используется для перемещения курсора
// на элемент или один из его дочерних элементов.
// addEventListener во втором параметре всегда ожидает функцию,
// поэтому используется функция обратного вызова.
// метод связывания // Метод bind() создаёт новую функцию,
// которая при вызове устанавливает в качестве контекста выполнения this,
// предоставленное значение. В метод также передаётся набор аргументов,
// которые будут установлены перед переданными в привязанную функцию аргументами при её вызове.
c.addEventListener("mouseover",m.bind(.4)),// Событие mouseout запускается, Element когда указывающее устройство (обычно мышь)
// используется для перемещения курсора таким образом, чтобы он больше
// не содержался внутри элемента или одного из его дочерних элементов.
c.addEventListener("mouseout",m.bind(1));/////////////////////////////////////////////////////////////
// Выбор, создание и удаление элементов
// const message = document.createElement(`div`);
// message.classList.add(`cookie-message`);
// // message.textContent = `We use cookied for improved functionalyty and analytics`;
// message.innerHTML = `
// We use cookied for improved functionalyty and analytics.
// <buttton class="btn btn--close-cookie">Got it!</button>
// `;
// // Метод Element.prepend()вставляет набор Nodeобъектов
// или строковых объектов перед первым дочерним элементом Element.
// Строковые объекты вставляются как эквивалентные Text узлы.
// // header.prepend(message);
// // Метод Element.append() вставляет узлы или строки с текстом
// в конец Element. Строки с текстом вставляются как текстовое содержимое.
// header.append(message);
// // Delete elements
// document
//   .querySelector(`.btn--close-cookie`)
//   .addEventListener(`click`, function () {
//     // message.remove();
//     message.parentElement.removeChild(message);
//   });
// message.style.backgroundColor = `#37383d`;
// message.style.width = `103%`;
// // Изменение цвета
// document.documentElement.style.setProperty(`--color-primary`, `orangered`);
// // изменение размера
// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height) + 40 + `px`;
//# sourceMappingURL=index.c9289794.js.map

//# sourceMappingURL=index.c9289794.js.map
