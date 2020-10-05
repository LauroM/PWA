//import  {Task}  from './models/task.js';
var tasks = [];
onload = () => {
    var t = JSON.parse(localStorage.getItem('tarefas'));
    (t)?tasks = t: tasks = [];
    loadList();
}

function newTask(){
    document.getElementById("tela1").style.display = 'none';
    document.getElementById("tela2").style.visibility = 'visible';
}

function saveTask(){
        
    if($('#tema').val() !== '' && $('#descricao').val() !== '' ){
        
        const task = new Task(tasks.length,false,$('#tema').val(),$('#descricao').val(),$('#startDate').val(),$('#endDate').val());
        console.log('Minhas tarefas =>  ', task);
        tasks.push(task);
        localStorage.setItem('tarefas', JSON.stringify(tasks));
        
        this.loadList().then(response => {
            console.log('response');
            this.backToList();
        });
    }
}

function backToList(){
    document.getElementById("tela1").style.display = 'block';
    document.getElementById("tela2").style.visibility = 'hidden';
}

async function createTask(){
    var divPai = document.querySelector('#tarefas');
    var divNova = document.createElement('div');
    divNova.innerHTML = 
    `<div class="list-group-item d-flex justify-content-between"> 
        <div class="form-check">
            <input type="checkbox" class="form-check-input" id="${tasks.length++}">
            <label class="form-check-label" for="materialUnchecked">${$("#tema").val()}</label>
        </div>
        <div>
            <i onclick="editarTarefa()" class="fas fa-pen" style="cursor: pointer; color:#007bff; margin-right: 10px;"></i>
            <i onclick="apagarTarefa()" class="far fa-trash-alt" style="cursor: pointer; color:red;"></i>
        </div>
    </div>`;
    divPai.append(divNova);

    $('#tema').val("");
    $('#descricao').val("");
    $('#startDate').val("");
    $('#endDate').val("");

}


async function loadList(){
    var divPai = document.querySelector('#tarefas');
    divPai.innerHTML = '';

    tasks.forEach(element => {
        var divNova = document.createElement('div');
        divNova.innerHTML = 
        `<div class="list-group-item d-flex justify-content-between"> 
            <div class="form-check">
                <input type="checkbox" class="form-check-input" id="${element.id}">
                <label class="form-check-label" for="materialUnchecked">${element.nome}</label>
            </div>
            <div>
                <i onclick="editarTarefa(${element.id})" class="fas fa-pen" style="cursor: pointer; color:#007bff; margin-right: 10px;"></i>
                <i onclick="apagarTarefa(${element.id})" class="far fa-trash-alt" style="cursor: pointer; color:red;"></i>
            </div>
        </div>`;
        divPai.append(divNova);
        this.resetForms();
    });

}

async function resetForms(){
    $('#tema').val("");
    $('#descricao').val("");
    $('#startDate').val("");
    $('#endDate').val("");
}


async function apagarTarefa(id){
    const delTask = JSON.parse(localStorage.getItem('tarefas'));
    var updateTasks = delTask.filter(function (item ) {
        return item.id !== id;
    });
    localStorage.setItem('tarefas', JSON.stringify(updateTasks));
    loadList();
    document.location.reload(true);
}

function editarTarefa(id){
    this.newTask();
    const editTasks = JSON.parse(localStorage.getItem('tarefas'));
    var editTask = editTasks.filter(function (item) {
        return item.id == id;
    });
    document.getElementById("tema").value = editTask[0].nome;
    document.getElementById("descricao").value = editTask[0].descricao;
    document.getElementById("startDate").value = editTask[0].startDate;
    document.getElementById("endDate").value = editTask[0].endDate;

    //this.saveTask('edit');

}

async function updateTasks(){
    this.saveTask();
}