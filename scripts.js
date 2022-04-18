let nome;
let destinatario = "Todos";
let tipoMSG = "message";
let tipoSubtexto = "Público";
let msg;


function entrar(){
    nome = document.querySelector(".inputNome").value;
    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', {name: nome});
    promise.catch(erro);
    promise.then(revelaTudo);
    setInterval(function(){
        axios.post('https://mock-api.driven.com.br/api/v6/uol/status',{name: nome})
    }, 4000);
}

function erro(){
    alert("Usuario já escolhido por favor selecione outro!");
    document.querySelector(".inputNome").value = "";
}


function revelaTudo(){
    const auxiliar = document.querySelector(".teladeentrada").classList;
    auxiliar.add("escondido"); 
    capturaMSG();
}



function capturaMSG(){
    const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promise.then(renderizarMSG);
}


setInterval(capturaMSG, 3000);


function renderizarMSG(elemento){
    const auxiliar = elemento.data;
    let chat = document.querySelector(".chat");
    chat.innerHTML = "";
    for(let i = 0; i < auxiliar.length; i++){
        if(auxiliar[i].type == "private_message"){
            if(auxiliar[i].to == "Todos" || auxiliar[i].to == nome || auxiliar[i].from == nome){
                chat.innerHTML += `
            <div class="${auxiliar[i].type}">
                <span class="hora">(${auxiliar[i].time})</span> <span><strong>${auxiliar[i].from}</strong> para <strong>${auxiliar[i].to}</strong>: ${auxiliar[i].text}</span>
            </div>
            `}
        }else{
            chat.innerHTML += `
            <div class="${auxiliar[i].type}">
                <span class="hora">(${auxiliar[i].time})</span> <span><strong>${auxiliar[i].from}</strong> para <strong>${auxiliar[i].to}</strong>: ${auxiliar[i].text}</span>
            </div>
            `}
        }
        const aux = chat.querySelector(":nth-child(99)");
        aux.scrollIntoView();
    }

    






function buscaAtivos(){
    const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants');
    promise.then(inserirAtivos);
}

buscaAtivos();

function inserirAtivos(elemento){
    const auxiliar = elemento.data;
    const aux = document.querySelector(".ativos");
    aux.innerHTML = "";
    aux.innerHTML = `<div onclick="destino(this)"> <div><ion-icon name="people"></ion-icon><span>Todos</span></div> 
    <div class="ion"><ion-icon name="checkmark"></ion-icon></div> </div>`;
    for(let i = 0; i<auxiliar.length; i++){
        aux.innerHTML += `
        <div onclick="destino(this)"> <div><ion-icon name="people"></ion-icon><span>${auxiliar[i].name}</span></div> 
        <div class="ion"><ion-icon name="checkmark"></ion-icon></div> </div>
        `
    }
}

setInterval(buscaAtivos, 10000);

function  selecionaDestino(elemento){
    const destinoSelecionado = document.querySelector(".ativos .selecionado");
    if (destinoSelecionado !== null) {
        destinoSelecionado.classList.remove("selecionado");
      }
      elemento.classList.add("selecionado");
}

function selecionaTipo(elemento){
    const tipoSelecionado = document.querySelector(".tipoMSG .selecionado");
    if (tipoSelecionado !== null) {
        tipoSelecionado.classList.remove("selecionado");
      }
      elemento.classList.add("selecionado");

}


function destino(elemento){
    destinatario =  elemento.innerText;
    selecionaDestino(elemento);
    subTxt();
}

function qualTipo(elemento){
    const auxiliar = elemento.innerText;
    tipoSubtexto = auxiliar;
    if(auxiliar == "Reservadamente"){
        tipoMSG = "private_message";
    }else{
        tipoMSG = "message";
    }
    selecionaTipo(elemento);
    subTxt();
}

function subTxt(){
    const auxiliar = document.querySelector(".subTXT");
    auxiliar.innerHTML = `Enviando para ${destinatario} (${tipoSubtexto})`;
}

function enviarMSG(){
    msg = document.querySelector(".inputChat").value;
    let mensagem = {
        from: nome,
	    to: destinatario,
	    text: msg,
	    type: tipoMSG
    }
    document.querySelector(".inputChat").value = "";
    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', mensagem);
    promise.then(enviou);
    promise.catch(deuruim);
       
}

function enviou(){
    capturaMSG();
}

function deuruim(){
    window.location.reload();
}

function sidebar(){
    const aux = document.querySelector(".sidebar").classList;
    aux.remove("escondido");
    subTxt();
}

function esconde(){
    const aux = document.querySelector(".sidebar").classList;
    aux.add("escondido");
}

function verificaenter(event){
    msg = document.querySelector(".inputChat").value;
    if (event.code == "Enter" && msg !== "" ){
        enviarMSG();
    }
}

const sendMSG = document.querySelector(".enviar");
document.addEventListener('keypress', verificaenter)