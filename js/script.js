/* Задания на урок, часть первая:
1) Удалить все рекламные блоки со страницы (правая часть сайта)
2) Изменить жанр фильма, поменять "комедия" на "драма"
3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS
4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 
5) Добавить нумерацию выведенных фильмов */

"use strict";

const movieDB = {
  movies: [
    "Логан",
    "Лига справедливости",
    "Ла-ла лэнд",
    "Одержимость",
    "Скотт Пилигрим против...",
  ],
};

const promo = document.querySelectorAll(".promo__adv img"),
  genre = document.querySelector(".promo__genre"),
  poster = document.querySelector(".promo__bg"),
  movieList = document.querySelector(".promo__interactive-list");

const delPromo = (item) => {
  item.forEach((el) => el.remove());
};
delPromo(promo);

const makeСhanges = () => {
  genre.textContent = "Драма";
  poster.style.backgroundImage = 'url("../img/bg.jpg")';
};
makeСhanges();

const sortedFilms = (list) => {
  list.sort();
};
sortedFilms(movieDB.movies);

// Вторая часть
// 1 реализовать функционал, заполнение формы и нажатия подтвердить, новый фильм добавляется в список. Страница не перезагружается.
// 2 Если название больше 21 симовла - обрезать и добавить ...
// 3 При клике на мусорку элемент удаляется
// 4 Если в форме есть галочка "Любимый фильм" - в конcоль вывести сообщение "Добавляем любимый фильм"
// 5 Фильмы отсортированы по алфавиту

const addForm = document.querySelector("form.add"),
  addInput = addForm.querySelector(".adding__input"),
  checkBox = addForm.querySelector('[type="checkbox"]');

addForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const check = checkBox.checked;
  const addFilm = addInput.value;

  if (addFilm !== "") {
    movieDB.movies.push(addFilm);
    if (check) console.log(`Добавляем любимый фильм: ${addFilm}`);
  }
  sortedFilms(movieDB.movies);
  createMovieList(movieDB.movies, movieList);
  e.target.reset();
});

function createMovieList(films, oldList) {
  oldList.innerHTML = "";
  films.forEach((el, idx) => {
    if (el.length >= 21) el = el.slice(0, 21) + "...";
    oldList.innerHTML += `<li class="promo__interactive-item">${idx + 1}) ${el}
        <div class="delete"></div></li>`;

    document.querySelectorAll(".delete").forEach((btn, i) => {
      btn.addEventListener("click", (e) => {
        btn.parentElement.remove();
        console.log(`Delete film: ${films.splice(i, 1)}`);
        createMovieList(films, oldList);
        
      });
    });
  });
}
createMovieList(movieDB.movies, movieList);
