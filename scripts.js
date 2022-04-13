let nome;

function entrar(aux){
    nome = prompt("Qual seu nome?");
    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', {name: nome});
    promise.catch(entrar);
    promise.then(capturaMSG);
}

entrar();

setTimeout(function(){
    axios.post('https://mock-api.driven.com.br/api/v6/uol/status',{name: nome})
}, 4000);

function capturaMSG(){
    const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promise.then(renderizarMSG);
}

function renderizarMSG(elemento){
    const auxiliar = elemento.data;
    console.log(auxiliar[96]);
}
