## Este é um aplicativo simples de tarefas (To-Do List) que permite:

💡Criar tarefas;

💡Exibir a lista de tarefas;

💡Salvar as tarefas no armazenamento local do navegador (localStorage);

💡Excluir tarefas.

<br>

## 👇A seguir, explico cada parte do código js e dou instruções para usar.

### 1. Configuração inicial: <br>
const input = document.querySelector("input");<br>
const createBtn = input.nextElementSibling;<br>
const tasksDiv = document.querySelector(".tasks");<br>

👩‍💻 Aqui, selecionamos os elementos do HTML:<br>
✅input: A caixa de texto onde você digita a tarefa.<br>
✅createBtn: O botão próximo ao input (botão para adicionar tarefas).<br>
✅tasksDiv: O container onde as tarefas aparecerão.<br>

<br>

### 2. Adicionar evento ao botão de criação:<br>
createBtn.onclick = (e) => {
    if (input.value.length < 1) return; <i>// Não faz nada se o texto estiver vazio</i><br>
    CreateTask(input.value);           <i>// Cria uma nova tarefa</i><br>
    input.value = "";                  <i>// Limpa o campo de entrada</i><br>
};<br>

👩‍💻Quando o botão "Criar" for clicado:<br>
✅Se o texto no input for vazio, não faz nada.<br>
✅Caso contrário, chama a função CreateTask() para salvar a tarefa.<br>
✅Limpa o campo de texto.<br>

<br>

### 3. Função CreateTask: <br>
function CreateTask(value) {<br>
    let Tasks = [];<br>
    let newTask = {<br>
        id: Date.now(),  <i>// ID único baseado na data/hora</i><br>
        text: value      <i>// Texto digitado no input</i><br>
    };
    if (window.localStorage.getItem("tasks")) {<br>
        Tasks = JSON.parse(window.localStorage.getItem("tasks")); <i>// Recupera tarefas já salvas</i><br>
    }<br>
    Tasks.push(newTask);  <i>// Adiciona a nova tarefa</i><br>
    window.localStorage.setItem("tasks", JSON.stringify(Tasks)); <i>// Salva no localStorage</i><br>
    RefreshTasks();        <i>// Atualiza a exibição das tarefas</i><br>
}

<br>

👩‍💻Essa função:<br>
✅Cria um objeto para a nova tarefa com id único e texto.<br>
✅Lê as tarefas já existentes no localStorage.<br>
✅Adiciona a nova tarefa à lista.<br>
✅Salva a lista atualizada no localStorage.<br>
✅Atualiza a interface chamando RefreshTasks().<br>

<br>

### 4. Função RefreshTasks:

function RefreshTasks() {<br>
    let tasks = JSON.parse(window.localStorage.getItem("tasks")); <i>// Lê tarefas salvas</i><br>
    let html = "";<br>
    if (tasks) {<br>
        for (let task of tasks) {<br>
            html += `
        <div class="task">
            <p class="task-text">${task.text}</p>
            <button class="deleteBtn" data-id="${task.id}">Delete</button>
        </div>`;
        }
        

        tasksDiv.innerHTML = html;  //Insere tarefas no HTML

        const deleteBtns = document.querySelectorAll(".deleteBtn");
        for (let deleteBtn of deleteBtns) {
            deleteBtn.onclick = (_) => {
                deleteTask(deleteBtn.dataset.id);  //Exclui tarefa ao clicar no botão "Delete"
            };
        }
    }
}

👩‍💻Essa função:<br>
✅Lê as tarefas do localStorage.<br>
✅Gera o HTML para exibir cada tarefa com um botão "Delete".<br>
✅Associa o evento onclick ao botão "Delete" de cada tarefa para permitir exclusão.<br>

<br>

### 5. Função deleteTask:

function deleteTask(id) {<br>
    let tasks = JSON.parse(window.localStorage.getItem("tasks")); <i>// Lê as tarefas</i><br>
    if (tasks) {<br>
        tasks.forEach((ele, index) => {<br>
            if (ele.id == id) {<br>
                tasks.splice(index, 1);  <i>// Remove a tarefa pelo índice</i><br>
            }<br>
        });<br>
        window.localStorage.setItem("tasks", JSON.stringify(tasks));  <i>// Atualiza o localStorage</i><br>
        RefreshTasks();  <i>// Atualiza a exibição</i><br>
    }<br>
}<br>

👩‍💻Essa função:<br>
✅Encontra a tarefa pelo id e remove da lista.<br>
✅Atualiza o localStorage com a lista nova.<br>
✅Chama RefreshTasks() para refletir a exclusão na interface.<br>
