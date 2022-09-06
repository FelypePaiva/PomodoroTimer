var tempo = document.getElementById("tempo")
var btnPlay = document.getElementById("play")
var btnPause = document.getElementById("pause")
var btnStop = document.getElementById("stop")
var intervalo;
var pomodoro = {
    tempo: [25,0],
    default: [25,0]
}
var pausa = {
    tempo: [5,0],
    default: [5,0]
}
var pausaLonga = {
    tempo: [15,0],
    default: [15,0]
}

var acaoAtual = pomodoro;
tempo.textContent = converterEmTempo();

btnPlay.addEventListener("click", function(){
    intervalo = setInterval(decrementarTempo,10)
})
btnPause.addEventListener("click",function(){
    btnPlay.removeAttribute("disabled");
    clearInterval(intervalo)
})
btnStop.addEventListener("click",function(){tempo.textContent = acaoAtual.default;})
function decrementarTempo(){
    if(acaoAtual.tempo[1] != 0){
        acaoAtual.tempo[1]--;
    }
    else{
        acaoAtual.tempo[1] = 59;
        acaoAtual.tempo[0]--;
    }
    btnPlay.setAttribute("disabled","disabled");
    console.log(acaoAtual.tempo)
    printarTempo();
    if(acaoAtual.tempo[0] <= 0 && acaoAtual.tempo[1] <= 0){
        //alert("Tempo Esgotado");
        clearInterval(intervalo);
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




//#region Evento de Clique no titulo
var titulo = document.getElementById("acaoAtual");
var listaOpcoes = document.getElementById("acoesDisponiveis");
titulo.addEventListener("click", mostrarOpcoes);
function mostrarOpcoes(){
    if(listaOpcoes.style.display == "none" || listaOpcoes.style.display == "")
        listaOpcoes.style.display = "block";
    else
        listaOpcoes.style.display = "none";

}
//#endregion