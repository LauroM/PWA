// variaveis globais
var tasks = []; // lista de tarefas cadastradas
var idTask=undefined; // id controller do item de edição

onload = () => {
    var t = JSON.parse(localStorage.getItem('tarefas'));
    (t)?tasks = t: tasks = [];
    loadList();
}

function newTask(value){
    document.getElementById("tela1").style.display = 'none';
    document.getElementById("tela2").style.visibility = 'visible';

    // TO-DO desfazer essa gambiarra mostruosa
    if(value==='new'){
        document.getElementById("edittask").style.visibility = 'hidden';
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

/**
 * Função para renderizar a lista de estudos
 * Constroi divs com a lista de tarefas e adiciona dinamicamente a div que contem o id "tarefas"
 * Constroi cada item se necessario, a partir do createElement, de modo a encaminha para o navegador
 * a div a ser adicionada na div Pai tarefas, fazendo as renderizações necessarias
 */
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

/**
 * Funcao para voltar a pagina principal, limpando navegação da pagina anterior
 */
function backToList(){
    this.idTask = undefined;
    document.getElementById("tela1").style.display = 'block';
    document.getElementById("tela2").style.visibility = 'hidden';
    this.resetButtons();
    this.resetForms();
}

/**
 * Limpar formulario
 */
async function resetForms(){
    $('#tema').val("");
    $('#descricao').val("");
    $('#startDate').val("");
    $('#endDate').val("");
}

/**
 * Gambiarra: Restar botões de salvar
 */
async function resetButtons(){
    document.getElementById("edittask").style.visibility = 'hidden';
    document.getElementById("newtask").style.visibility = 'hidden';
}

/**
 * Funcão para deletar tarefa cadastrada da lista.
 * Dado o id, é removido da listem o objeto.
 * 
 * @param {int} id 
 */
async function apagarTarefa(id){
    const delTask = JSON.parse(localStorage.getItem('tarefas'));
    var updateTasks = delTask.filter(function (item ) {
        return item.id !== id;
    });
    localStorage.setItem('tarefas', JSON.stringify(updateTasks));
    loadList();
    document.location.reload(true);
}

/**
 * Esta função é o inicio para editar a tarefa cadastrada.
 * Dado o id como parametro, é renderizado os inputs, mostrando os dados já cadastrado 
 * 
 * @param {int} id 
 */
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

/**
 * Funcao para gerar de modo randomico o Id da tarefa, a partir de um range definido como parametro
 * 
 * @param {int} min valor inicial
 * @param {int} max valor final
 * @returns         Retorna o id
 */
function randomInt(min, max) {
	return min + Math.floor((max - min) * Math.random());
}