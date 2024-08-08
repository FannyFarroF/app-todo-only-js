const button        = document.querySelector("#button_add");
const input_task    = document.querySelector("#task");
const list_tasks    = document.querySelector("#list-tasks");
const container_list= document.querySelector("#list");
let tasks           = []; 

button.addEventListener("click", addTask);
list_tasks.addEventListener("click", eventsByLine);
container_list.addEventListener("click", deleteAll);

function addTask() {
    const newTask = input_task.value.trim();
    if (newTask)
        addRowInList(newTask);
    else
        alert("La cadena está vacía. Por favor, ingrese algún valor.");
}

function addRowInList(newTask) {
    const row = document.createElement('li');
    const randon_id = Math.random(); 
    row.classList.add("list-group-item", "alert", "d-flex", "justify-content-between", "align-items-center");
    row.setAttribute('data-id', randon_id);
    row.innerHTML = ` 
            <div> ${newTask}</div>  
            <div class="buttons">
                <button class="btn btn-primary markedAsComplete" title="Marcar como Completado"> 
                    <i class="fas fa-check-square markedAsComplete"></i>
                </button> 
                <button class="btn btn-danger deleteTask" title="Eliminar Tarea"> 
                    <i class="fas fa-trash deleteTask"></i>
                </button> 
            </div>  
    `;
    list_tasks.appendChild(row);
    reset_input();

    const item = { id: randon_id, task: newTask }
    tasks.push(item);
    if (tasks.length > 1 )
        addButtonDeleteAll();        
}   

function reset_input(){
    input_task.value = "";
    input_task.focus();
}

function eventsByLine(e) {
    if (e.target.classList.contains('markedAsComplete'))
        markedTaskAsComplete(e)
    
    if(e.target.classList.contains('deleteTask'))
        deleteTaskInList(e)
}

function deleteTaskInList(e) {
    const row = e.target.closest('li');
    row.remove();
}

function markedTaskAsComplete(e) {
    const row = e.target.closest('li');
    row.classList.toggle('alert-success');
}

function addButtonDeleteAll(e) {
    if (!document.querySelector('.deleteAllTask')) {
        const div = document.createElement('div');
        div.classList.add('d-flex', 'justify-content-end')
        div.innerHTML = `
            <button class="btn btn-danger deleteAllTask" title="Eliminar Todo">Eliminar Todo</button>
        `;
        list_tasks.closest('div').appendChild(div);
    }
}

function deleteAll(e) {
    if (e.target.classList.contains('deleteAllTask')) {
        Array.from(list_tasks.querySelectorAll('.list-group-item')).map(element => element.remove())
        container_list.querySelector('.deleteAllTask').closest('div').remove();
        tasks = [];
    }
}