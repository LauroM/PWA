//import { Task } from '/models/task.js';

var tasks = [];

function newTask(){
    document.getElementById("tela1").style.display = 'none';
    document.getElementById("tela2").style.visibility = 'visible';
}

function saveTask(){
    
    // const task = new Task();

    localStorage.setItem('tarefas', JSON.stringify(tasks));

    this.createTask().then(response => {
        console.log('response');
        this.backToList();
    });
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
            <i onclick="editarTarefa()" class="fas fa-pen" style="cursor: pointer; color:#007bff;"></i>
            <i onclick="apagarTarefa()" class="far fa-trash-alt" style="cursor: pointer; color:red;"></i>
        </div>
    </div>`;
    divPai.append(divNova);

    $('#tema').val("");
    $('#descricao').val("");
    // resetar forms

}


function apagarTarefa(){
    console.log('=====> ');


    // this.newTask();
}

function editarTarefa(){
    this.newTask();
}
