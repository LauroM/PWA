//import  {Task}  from './models/task.js';
var tasks = [];
var idTask=undefined;

onload = () => {
    var t = JSON.parse(localStorage.getItem('tarefas'));
    (t)?tasks = t: tasks = [];
    loadList();
}

function newTask(value){
    document.getElementById("tela1").style.display = 'none';
    document.getElementById("tela2").style.visibility = 'visible';

    if(value==='new'){
        document.getElementById("edittask").style.visibility = 'hidden'; // inline-block;
        document.getElementById("newtask").style.visibility = 'visible';
    }else{
        document.getElementById("newtask").style.visibility = 'hidden';
        document.getElementById("edittask").style.visibility = 'visible';
    }
}

function saveTask(){
    if($('#tema').val() !== '' && $('#descricao').val() !== '' ){
        const task = new Task(randomInt( 1, 2000) + tasks.length,false,$('#tema').val(),$('#descricao').val(),$('#startDate').val(),$('#endDate').val());
        tasks.push(task);
        localStorage.setItem('tarefas', JSON.stringify(tasks));
        this.loadList().then(response => {
            this.backToList();
        });
    }
}

function editTask(){
    const editTasks = JSON.parse(localStorage.getItem('tarefas'));
    var t = editTasks.filter(function (item) {
        if(item.id == this.idTask){
            item.nome = $('#tema').val();
            item.descricao = $('#descricao').val();
            item.startDate = $('#startDate').val();
            item.endDate = $('#endDate').val();
        }
        return item;
    });

    if($('#tema').val() !== '' && $('#descricao').val() !== '' ){
        localStorage.setItem('tarefas', JSON.stringify(t));
        this.loadList().then(response => {
            document.location.reload();
            this.backToList();
        });
    }
}

function backToList(){
    this.idTask = undefined;
    document.getElementById("tela1").style.display = 'block';
    document.getElementById("tela2").style.visibility = 'hidden';
    this.resetButtons();
    this.resetForms();
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

async function resetButtons(){
    document.getElementById("edittask").style.visibility = 'hidden';
    document.getElementById("newtask").style.visibility = 'hidden';
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
    this.idTask = id;
    this.newTask('edit');
    const editTasks = JSON.parse(localStorage.getItem('tarefas'));
    var editTask = editTasks.filter(function (item) {
        return item.id == id;
    });
    document.getElementById("tema").value = editTask[0].nome;
    document.getElementById("descricao").value = editTask[0].descricao;
    document.getElementById("startDate").value = editTask[0].startDate;
    document.getElementById("endDate").value = editTask[0].endDate;
}

function randomInt(min, max) {
	return min + Math.floor((max - min) * Math.random());
}