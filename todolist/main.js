let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

let ul = document.querySelector('.list-group'); // фото
let form = document.forms['addTodoItem'];
let inputText = form.elements['todoText'];
let deleteBtn = document.querySelector('.clear-btn');
let notificationAlert = document.querySelector('.notification-alert');

// let models = {
//     id: '',
//     text: ''
// };

// Генерируем id
function generateId() {
    let id = '';
    let words = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
    
    for (let i = 0; i < 15; i++) {
        let position = Math.floor(Math.random() * words.length);
        id += words[position];
    }
    
    return id;
};

// Создаем li добавляем класс и возвращаем li
function listTemplate(task) {
    let li = document.createElement('li');
    li.className = 'list-group-item d-flex align-items-center';
    li.setAttribute('data-id', task.id);
    let span = document.createElement('span');
    span.textContent = task.text;

    // Добавление иконки удаление к li
    let iDelete = document.createElement('i');
    iDelete.className = 'far fa-trash-alt delete-item ml-2';

    // Добавление иконки редактирование к li
    let iEdit = document.createElement('i');
    iEdit.className = 'fas fa-edit edit-item ml-auto';
    
    li.appendChild(span);
    li.appendChild(iEdit);
    li.appendChild(iDelete);

    return li;
};

// Очищаем список
function clearList() {
    ul.innerHTML = '';
};

// Основная функция которая генерирует массив списка
function generateList(tasksArray) {
    
    clearList();
    
    for ( let i = 0; i < tasksArray.length; i++) {
        let li = listTemplate(tasksArray[i]);
        ul.appendChild(li); // Добавить дочерний элемент
    }
};

// Функция которая добавляет новые задачи
function addList(list) {
    let newTask = {
        id: generateId(),
        text: list
    };
    tasks.unshift(newTask);
    ul.insertAdjacentElement('afterbegin', listTemplate(newTask));
    // Добавление в LocalStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));

    message({
        text: 'Задача добавлена',
        cssClass: 'alert-success',
        timeout: 4000
    });
};

// Удаление айтема при клике и редактирование
ul.addEventListener('click', function (e) {
    if ( e.target.classList.contains('delete-item') ){
        let parent = e.target.closest('li');
        let id = parent.dataset.id;
        deleteListItem(id);
        parent.remove();
    } else if ( e.target.classList.contains('edit-item') ) {
        e.target.classList.toggle('fa-save');
        let id = e.target.closest('li').dataset.id;
        let span = e.target.closest('li').querySelector('span');

        if ( e.target.classList.contains('fa-save') ) {
            span.setAttribute('contenteditable', true);
            span.focus();
        } else {
            span.setAttribute('contenteditable', false);
            span.blur();
            editListItem(id, span.textContent);
        }
    }
});

// Функция нахождения и удаление айтема
function deleteListItem(id) {

    for (let i = 0; i < tasks.length; i++) {
        if ( tasks[i].id === id ) {
            tasks.splice(i, 1);
            break;
        }
    }
    
    // Обнавление LocalStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));

    message({
        text: 'Задача удалена',
        cssClass: 'alert-danger',
        timeout: 4000
    });
};

function editListItem(id, newValue) {
    for (let i = 0; i < tasks.length; i++) {
        if ( tasks[i].id === id ) {
            tasks[i].text = newValue;
            break;
        }
    }
    
    // Обнавление LocalStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));

    message({
        text: 'Задача изменена',
        cssClass: 'alert-success',
        timeout: 4000
    });
};

function message(settings) {
    notificationAlert.classList.add(settings.cssClass);
    notificationAlert.textContent = settings.text;
    notificationAlert.classList.add('show');

    setTimeout(function () {
        notificationAlert.classList.remove('show');
    }, settings.timeout);
};

// Проверка инпута и добавление айтема
form.addEventListener('submit', function (e) {
    e.preventDefault();
    if ( !inputText.value ) {
        // show error
        inputText.classList.add('is-invalid');
    } else {
        addList(inputText.value);
        inputText.classList.remove('is-invalid');
        form.reset();
    }
});

// Удаление класса ошибки
inputText.addEventListener('keyup', function (e) {
    if ( inputText.value) {
        inputText.classList.remove('is-invalid');
    }
});

// Очищение списка
deleteBtn.addEventListener('click', function (e) {
    clearList();
    localStorage.clear();
});

generateList(tasks);

