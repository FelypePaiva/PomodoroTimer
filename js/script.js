var tempo = document.getElementById("tempo")
var btnPlay = document.getElementById("play")
var btnPause = document.getElementById("pause")
var btnStop = document.getElementById("stop")
var intervalo;
var pomodoro = {
    nome: "Pomodoro",
    tempo: [25,0],
    default: [25,0]
}
var pausa = {
    nome: "Pausa",
    tempo: [5,0],
    default: [5,0]
}
var pausaLonga = {
    nome: "Pausa Longa",
    tempo: [15,0],
    default: [15,0]
}
var indiceLista = 0;
var opcoesList = [pomodoro, pausa, pausaLonga];

var acaoAtual = pomodoro;
var tempoOcorrido = {
    tempo: [0,0]
}
tempo.textContent = converterEmTempo();
atualizarProgressBar();
btnPlay.addEventListener("click", function(){
    intervalo = setInterval(decrementarTempo,100)
    mostrarBotao("pause");
})
btnPause.addEventListener("click",function(){
    mostrarBotao("play");
    clearInterval(intervalo)
})
btnStop.addEventListener("click",function(){
    acaoAtual.tempo[0] = acaoAtual.default[0];
    acaoAtual.tempo[1] = acaoAtual.default[1];
    tempoOcorrido = {tempo:[0,0]}
    printarTempo();
    atualizarProgressBar();
    //tempo.textContent = acaoAtual.default;
    mostrarBotao("play");
    clearInterval(intervalo)
})
function decrementarTempo(){
    if(acaoAtual.tempo[0] <= 0 && acaoAtual.tempo[1] <= 0){
        alternarOpcao();
        clearInterval(intervalo);
        return;
    }
    if(acaoAtual.tempo[1] != 0){
        acaoAtual.tempo[1]--;
    }
    else{
        acaoAtual.tempo[1] = 59;
        acaoAtual.tempo[0]--;
    }
    incrementaTempoOcorrido();
    printarTempo();
    atualizarProgressBar();
}
function incrementaTempoOcorrido(){
    if(tempoOcorrido.tempo[1] != 59){
        tempoOcorrido.tempo[1]++;
    }
    else{
        tempoOcorrido.tempo[1] = 0;
        tempoOcorrido.tempo[0]++;
    }
}
function printarTempo(){
    //tempo.textContent = acaoAtual.tempo
    tempo.textContent = converterEmTempo();
}
function converterEmTempo(){
    let tempo = "";
    tempo += acaoAtual.tempo[0].toString().padStart(2, "0");
    tempo += ":";
    tempo += acaoAtual.tempo[1].toString().padStart(2, "0");
    return tempo;
}
function getSegundos(tempo){
    let segundos = (tempo[0] * 60) + tempo[1];
    return segundos;
}




//#region Evento de Clique no titulo
var titulo = document.getElementById("acaoAtual");
var listaOpcoes = document.getElementById("acoesDisponiveis");
titulo.addEventListener("click", alternarOpcao);
function mostrarOpcoes(){
    if(listaOpcoes.style.display == "none" || listaOpcoes.style.display == "")
        listaOpcoes.style.display = "block";
    else
        listaOpcoes.style.display = "none";

}
function alternarOpcao(){
    acaoAtual.tempo[0] = acaoAtual.default[0];
    acaoAtual.tempo[1] = acaoAtual.default[1];
    if(indiceLista < opcoesList.length - 1){
        alterarAcaoAtual(++indiceLista);
    }else{
        indiceLista = 0;
        alterarAcaoAtual(indiceLista);
    }
    mostrarBotao("play");
}

var itensAcao = document.getElementsByClassName("acaoItem");
for(let i = 0; i < itensAcao.length;i++){
    itensAcao[i].addEventListener("click",alterarAcaoAtual)
    //console.log(itensAcao[i].textContent);

}
function alterarAcaoAtual(event){
    let opcaoSelecionada = event.target.textContent;
    let acao = acaoAtual;
    
    switch(opcaoSelecionada){
        case "Pomodoro":
            acao = pomodoro;
        break;
        case "Pausa":
            acao = pausa;
        break;
        case "Pausa Longa":
            acao = pausaLonga;
        break;
        default:
            acao = pomodoro;
        break;
    }

    document.getElementById("acaoAtualNome").textContent = acao.nome;
    //console.log("clicado em " + opcaoSelecionada);
    
    console.table(acao);
    acaoAtual = acao;
    printarTempo();
    mostrarOpcoes();
    tempoOcorrido.tempo = [0,0];
    
}
function alterarAcaoAtual(i){
    let acao = opcoesList[i];
    acaoAtual = acao;
    document.getElementById("acaoAtualNome").textContent = acao.nome;
    printarTempo();
    tempoOcorrido.tempo = [0,0];
}
//#endregion


function TempoEmDeg(){
    let tempoBase = getSegundos(acaoAtual.default);
    let minutosOcorridos = getSegundos(tempoOcorrido.tempo);
    let timeDeg = (360 * minutosOcorridos) / tempoBase;
    return timeDeg;
}

function atualizarProgressBar(){
    let el = document.querySelector(".externo");
    let graus = TempoEmDeg();
    el.style.background = `conic-gradient(#8CD4A2 ${graus}deg, #eee 0deg)`;
    console.log(graus);
}
function mostrarBotao(botao){
    if(botao == "play"){
        document.getElementById("play").style.display = "inline-block";
        document.getElementById("pause").style.display = "none";
    }else if(botao == "pause"){
        document.getElementById("play").style.display = "none";
        document.getElementById("pause").style.display = "inline-block";
    }
}