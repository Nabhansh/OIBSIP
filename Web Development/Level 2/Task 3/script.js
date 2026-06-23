const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        addTask();
    }
});

function addTask(){

    const text = taskInput.value.trim();

    if(text === "") return;

    const task = {
        id: Date.now(),
        text: text,
        completed: false,
        createdAt: new Date().toLocaleString(),
        completedAt: null
    };

    tasks.push(task);

    taskInput.value = "";

    saveTasks();
    renderTasks();
}

function renderTasks(){

    const pendingList =
        document.getElementById("pendingList");

    const completedList =
        document.getElementById("completedList");

    pendingList.innerHTML = "";
    completedList.innerHTML = "";

    const pending =
        tasks.filter(task => !task.completed);

    const completed =
        tasks.filter(task => task.completed);

    document.getElementById("pendingCount")
        .textContent = pending.length;

    document.getElementById("completedCount")
        .textContent = completed.length;

    document.getElementById("pendingEmpty")
        .style.display =
            pending.length ? "none" : "block";

    document.getElementById("completedEmpty")
        .style.display =
            completed.length ? "none" : "block";

    pending.forEach(task => {
        pendingList.appendChild(
            createTaskElement(task)
        );
    });

    completed.forEach(task => {
        completedList.appendChild(
            createTaskElement(task)
        );
    });
}

function createTaskElement(task){

    const li = document.createElement("li");

    li.className = "task-item";

    if(task.completed){
        li.classList.add("completed");
    }

    let completedTime = "";

    if(task.completed && task.completedAt){
        completedTime =
            `<div class="timestamp">
                Completed: ${task.completedAt}
            </div>`;
    }

    li.innerHTML = `
        <div class="task-text">${task.text}</div>

        <div class="timestamp">
            Added: ${task.createdAt}
        </div>

        ${completedTime}

        <div class="task-actions">

            <button
                class="complete-btn"
                data-id="${task.id}">
                ${
                    task.completed
                    ? "Mark Pending"
                    : "Mark Complete"
                }
            </button>

            <button
                class="edit-btn"
                data-id="${task.id}">
                Edit
            </button>

            <button
                class="delete-btn"
                data-id="${task.id}">
                Delete
            </button>

        </div>
    `;

    li.querySelector(".complete-btn")
        .addEventListener("click", () =>
            toggleTask(task.id)
        );

    li.querySelector(".edit-btn")
        .addEventListener("click", () =>
            editTask(task.id)
        );

    li.querySelector(".delete-btn")
        .addEventListener("click", () =>
            deleteTask(task.id)
        );

    return li;
}

function toggleTask(id){

    tasks = tasks.map(task => {

        if(task.id === id){

            task.completed =
                !task.completed;

            task.completedAt =
                task.completed
                ? new Date().toLocaleString()
                : null;
        }

        return task;
    });

    saveTasks();
    renderTasks();
}

function editTask(id){

    const task =
        tasks.find(task => task.id === id);

    const updatedText =
        prompt(
            "Edit Task",
            task.text
        );

    if(
        updatedText !== null &&
        updatedText.trim() !== ""
    ){
        task.text =
            updatedText.trim();

        saveTasks();
        renderTasks();
    }
}

function deleteTask(id){

    tasks =
        tasks.filter(
            task => task.id !== id
        );

    saveTasks();
    renderTasks();
}

function saveTasks(){

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}

renderTasks();
