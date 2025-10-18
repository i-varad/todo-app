const taskContainer = document.querySelector('.taskify-wrapper');
const inputTitle = document.querySelector('.create-title');
const inputDescription = document.querySelector('.create-description');
const createTaskButton = document.querySelector('.create-task');
const noTasks = document.querySelector('.no-tasks');


// Saving a task list
let tasks = [];



function renderTasks() {
    taskContainer.innerHTML = "";

    if (tasks.length === 0) {
        taskContainer.innerHTML = `<div class="no-tasks"><p>There are no tasks yet!</p></div>`;
        return; // exit function, no tasks to render
    }

    tasks.forEach((task, index) => {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');

        taskDiv.innerHTML = `
            <div class="task-data">
                <h1 class="task-title">${task.title}</h1>
                <p class="task-description">${task.description}</p>
            </div>
            <div class="task-actions">
                <p class="actions-status">${task.isDone ? "Done" : "Pending"}</p>
                <p class="actions-delete">Delete</p>
            </div>
        `;

        // ✅ Event listeners for THIS task
        const statusButton = taskDiv.querySelector('.actions-status');
        statusButton.addEventListener('click', () => {
            tasks[index].isDone = !tasks[index].isDone;
            saveTasks();
            renderTasks();
        });

        const deleteButton = taskDiv.querySelector('.actions-delete');
        deleteButton.addEventListener('click', () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });

        taskContainer.appendChild(taskDiv); // ✅ append inside the loop
    });
}



// Creating tasks

function addTask() {

    const title = inputTitle.value.trim();
    const description = inputDescription.value.trim();

    if (!title) {
        alert("Please enter the title");
        return;
    }

    const newTask = {
        title,
        description,
        isDone: false
    }


    tasks.push(newTask);
    saveTasks();
    inputTitle.value = "";
    inputDescription.value = "";

    renderTasks();
}

createTaskButton.addEventListener('click', addTask);
inputDescription.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTask();
});


function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks); // convert string back to array
    }
}
// Initial rendering of tasks
loadTasks();
renderTasks();

