
onload = () => {

    function newTask(){
        document.getElementById("tela1").style.display = 'none';
        document.getElementById("tela2").style.visibility = 'visible';
    }
    
    function saveTask(){
        this.backToList();
    }
    
    function editTask(id){
    
    }
}

function backToList(){
    document.getElementById("tela1").style.display = 'block';
    document.getElementById("tela2").style.visibility = 'hidden';
}