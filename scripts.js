let nome;
let destinatario = "Todos";
let tipoMSG = "message";

function entrar(){
    nome = prompt("Qual seu nome?");
    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', {name: nome});
    promise.catch(entrar);
    promise.then(capturaMSG);
}

entrar();

setInterval(function(){
    axios.post('https://mock-api.driven.com.br/api/v6/uol/status',{name: nome})
}, 4000);




function capturaMSG(){
    const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promise.then(renderizarMSG);
}

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

    

setInterval(capturaMSG, 3000);




function buscaAtivos(){
    const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants');
    promise.then(inserirAtivos);
}

buscaAtivos();

function inserirAtivos(elemento){
    const auxiliar = elemento.data;
    const aux = document.querySelector(".ativos");
    aux.innerHTML = "";
    aux.innerHTML = `<div onclick="destino(this)"><ion-icon name="people"></ion-icon> <span>Todos</span></div>`;
    for(let i = 0; i<auxiliar.length; i++){
        aux.innerHTML += `
        <div onclick="destino(this)"><ion-icon name="people"></ion-icon> <span>${auxiliar[i].name}</span></div>
        `
    }
}

setInterval(buscaAtivos, 10000);

function  ativaSubtxt(){

}

function destino(elemento){
    destinatario =  elemento.innerText;
    console.log(destinatario);
    ativaSubtxt();
}

function qualTipo(elemento){
    const auxiliar = elemento.innerText;
    console.log(tipoMSG);
    if(auxiliar == "Reservadamente"){
        tipoMSG = "private_message";
    }else{
        tipoMSG = "message";
    }
    console.log(tipoMSG);
}


function enviarMSG(){
    let msg = document.querySelector(".inputChat").value;
    console.log(msg);
    let mensagem = {
        from: nome,
	    to: destinatario,
	    text: msg,
	    type: tipoMSG
    }
    document.querySelector(".inputChat").value = "";
    console.log(msg);
    console.log(mensagem);
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
}

function esconde(){
    const aux = document.querySelector(".sidebar").classList;
    aux.add("escondido");
}
