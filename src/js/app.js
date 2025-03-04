import '@scss/style';
import '@js/connectImages';

let currentCategory = "people"; // то что показывем по умолчанию как бы предзагурзка
let currentPage = 1;
const startUrl = "https://swapi.dev/api/";

// мейн функция загрузка данных + страница 
function loadData() {
    const url = `${startUrl}${currentCategory}/?page=${currentPage}`;

    //запрос на сервак
    fetch(url)
        .then(response => response.json())
        .then(data => {
            renderData(data.results); // тут передаем в renderData полученные результаты
            updatePagination(data.next, data.previous); // обнов вперед/назад updatePagination
        })
        .catch(error => console.error("error:", error));
}

// вывод данных 
function renderData(items) {
    const container = document.querySelector(".data");
    container.innerHTML = "";

    items.forEach(item => {
        const element = document.createElement("div");
        element.textContent = `Name: ${item.name}`;
        element.classList.add("item");
        element.addEventListener("click", () => showDetails(item)); // при клике вызываем showDetails

        container.appendChild(element);
    });
}

// всплыв окно показа деталей каждого выбраного 
function showDetails(item) {
    const modal = document.querySelector(".modal");
    const modalContent = document.querySelector(".modal-content");

    modalContent.innerHTML = getDetailsHTML(item); // тут по сути формируем html для показа на старинице когда выбирем
    modal.style.display = "block";
}

// закрытие через любую область вне зоны на фон 
window.addEventListener("click", (event) => {
    const modal = document.querySelector(".modal");
    const modalContent = document.querySelector(".modal-content");
    // тут проверяем где был клик и если надо - скрываем
    if (event.target === modal) {
        modal.style.display = "none";
    }
});


// тут тот самый html формируем на вывод модалки
import { getDetailsHTML } from "@js/details";

// обвовление кнопок, типо кнопки показываються если будут подгурдены ссылки next или prev
function updatePagination(next, prev) {
    document.querySelector(".next").style.display = next ? "block" : "none";
    document.querySelector(".prev").style.display = prev ? "block" : "none";
}

// тут переключаем категории1
function changeCategory(category) {
    currentCategory = category;
    currentPage = 1;
    loadData(); // тут уже передаем выбранные данные
}

// обработываем клики на кнопки с категориями
document.querySelector(".btn-people").addEventListener("click", () => changeCategory("people"));
document.querySelector(".btn-planets").addEventListener("click", () => changeCategory("planets"));
document.querySelector(".btn-transport").addEventListener("click", () => changeCategory("vehicles"));

// два перехода (1)
document.querySelector(".next").addEventListener("click", () => {
    currentPage++;
    loadData();
});

// два перехода(2)
document.querySelector(".prev").addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        loadData();
    }
});

document.addEventListener("DOMContentLoaded", loadData);

import { forApp } from '@/js/connectImages';

const footerElement = document.createElement("img");
footerElement.src = forApp.footer;
footerElement.style.width = "100%";
document.body.appendChild(footerElement);