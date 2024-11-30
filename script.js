const input = document.querySelector("input");
const createBtn = input.nextElementSibling;
const tasksDiv = document.querySelector(".tasks");

RefreshTasks();

createBtn.onclick = (e) =>{
    if (input.value.lenght < 1) return;
    CreateTask(input.value);
    input.value = "";
};

function CreateTask(value){
    let Tasks = [];
    let newTask = {
        id: Date.now(),
        text: value
    };
    if (window.localStorage.getItem("tasks")){
        Tasks = JSON.parse(window.localStorage.getItem)("tasks");
    }
    Tasks.push(newTask);
    window.localStorage.setItem("tasks", JSON.stringify(Tasks));
    RefreshTasks();
}

function RefreshTasks(){
    let tasks = JSON.parse(window.localStorage.getItem("tasks"));
    let html = "";
    if (tasks){
        for (let task of tasks){
            html += `
        <div class="task">
            <p class="task-text">{task.text}</p>

            <button class="deleteBtn" data-id="${task.id}">Delete</button>
        </div>
            `;
        }

        tasksDiv.innerHTML = html;

        const deleteBtns = document.querySelectorAll(".deleteBtn");
        for (let deleteBtn of deleteBtns){
            deleteBtn.onclick = (_) =>{
                deleteTask(deleteBtn.dataset.id);
            };
        }
    }
}

function deleteTask(id){
    let tasks = JSON.parse(window.localStorage.getItem("tasks"));
    if (tasks){
        tasks.forEach((ele, index) =>{
            if (ele.id == id) {
                tasks.splice(index, 1);
            }
        });
        window.localStorage.setItem("tasks", JSON.stringify(tasks));
        RefreshTasks();
    }
}