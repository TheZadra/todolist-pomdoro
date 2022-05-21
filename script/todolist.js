const input = document.querySelector("input[type='text']");
const btn = document.querySelector("button");
const inputSearch = document.querySelector("#inputSearch");
const section = document.querySelector('section');

const iElementsDone = [...document.querySelectorAll("fa-check-circle")];
const searchIcon = document.querySelector("#searchIcon");
let iElementsTrash = [...document.querySelectorAll('.fa-trash-alt')];

let tasks = [];
let tasksCounter = 0;
let doneTasksCounter = 0;
let deleteTasksCounter = 0;

const start = () => {
    input.value === '' ? alert('Nic nie wprowadziłeś!') : addTask();
}

const enterKey = (e) => {
    if (input.value === '' && e.which === 13) {
        alert('Nic nie wprowadziłes!')
    } else if (e.which === 13) {
        addTask();
    }
}

const addTask = () => {
    const trashAdd = document.createElement("i");
    const doneAdd = document.createElement("i");
    const value = document.createElement("span");

    tasksCounter++;

    value.classList.add("task");
    trashAdd.classList.add("far", "fa-trash-alt");
    doneAdd.classList.add("far", "fa-check-circle");

    section.appendChild(value);
    value.innerHTML = `<p>${input.value}</p>`;

    value.insertBefore(trashAdd, value.childNodes[0]);
    iElementsTrash.push(trashAdd);
    value.insertBefore(doneAdd, value.childNodes[0]);
    iElementsDone.push(doneAdd);
    input.value = "";

    tasks.push(value);

    document.querySelector('.addTasks').textContent = tasksCounter;

    iElementsDone.forEach(iElement => iElement.addEventListener('click', doneElement));
    iElementsTrash.forEach(iElement => iElement.addEventListener('click', deleteElement));
}


const deleteElement = (e) => {
    tasks = tasks.filter(element => element != e.currentTarget.parentNode);
    e.currentTarget.parentNode.remove();
    
    iElementsTrash = iElementsTrash.filter(elementTrash => elementTrash != e.currentTarget);
    document.querySelector('.deleteTasks').textContent = ++deleteTasksCounter;
    document.querySelector('.addTasks').textContent = --tasksCounter;
}

const doneElement = (e) => {
    let currentItem = e.currentTarget.parentNode.lastElementChild;
    iElementsDone.pop(e.currentTarget);
    if (!currentItem.classList.contains('done')) {
        currentItem.classList.add('done');
        doneTasksCounter++
    } else {
        currentItem.classList.remove('done');
        doneTasksCounter--
    }
    document.querySelector('.doneTasks').textContent = doneTasksCounter;
}
const search = (e) => {
    let searchTasks = tasks;
    const searchText = e.target.value.toLowerCase();

    searchTasks = searchTasks.filter(task => task.textContent.toLowerCase().includes(searchText));
    section.textContent = "";

    searchTasks.forEach(item => section.appendChild(item));
}

document.querySelector("#searchIcon").addEventListener('click', () => {
    document.querySelector("#searchContainer").style.display = "flex";
});

document.querySelector(".fa-times").addEventListener('click', () => {
    document.querySelector("#searchContainer").style.display = "none";
});

input.addEventListener('keydown', enterKey);
btn.addEventListener('click', start);
inputSearch.addEventListener('input', search);



