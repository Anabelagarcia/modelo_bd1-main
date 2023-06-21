let Receptor = prompt("Qual seu nome?", "Seu Nome");

if (confirm("Bom dia " + Receptor + " !!!!!")) {
  alert("continuando");
}

const numero_moedas = 30;
const tempo_inicial = 15;
let pontos = 0;
let tempo = 0;
let timer = null;

let pontuacao = {
  name: Receptor,
  pontos: pontos
};

fetch("http://localhost:5050/score", {
  method: "POST",
  body: JSON.stringify(pontuacao),
  headers: { "Content-type": "application/json; charset=UTF-8" }
})
  .then(response => response.json())
  .then(json => console.log(json))
  .catch(error => console.log(error));


function iniciaJogo() {
  pontos = 0;
  tempo = tempo_inicial;
  let tela = document.getElementById("tela");
  tela.innerHTML = "";

  for (let i = 0; i < numero_moedas; ++i) {
    let moeda = document.createElement("img");
    moeda.src = "cristal.jpg";
    moeda.id = "j" + i;
    moeda.onclick = function() {
      pegaMoeda(this);
    };
    tela.appendChild(moeda);
  }
  timer = setInterval(contaTempo, 1000);

  const criarElemento= function(nome, ponto) {
    const container = document.getElementById("placar");
    const name = document.createElement("p");
    const ponta = document.createElement("p");

    name.textContent = nome;
    ponta.textContent = ponto;

    container.appendChild(name + ": " + ponto)
    
  }

  fetch("http://localhost:5050/score")
    .then(response => {
      if (!response.ok) {
        throw new Error("Erro na requisição");
      }
      return response.json();
    })
    .then(data => {
      const placarList = data;
      placarList.forEach(pontuacao => {
        criarElemento(pontuacao.name, pontuacao.pontos);
      });
    })
    .catch(error => {
      console.log(error);
    });



  
}

function pegaMoeda(moeda) {
  moeda.src = "clistal.png";
  ++pontos;
  let contadorPontos = document.getElementById("pontos");
  contadorPontos.innerText = pontos;
}

function contaTempo() {
  if (tempo > 0) {
    --tempo;
    let contadorTempo = document.getElementById("tempo");
    contadorTempo.innerText = tempo;
  }

  if (tempo <= 0) {
    clearInterval(timer);
    alert("Você fez " + pontos + " pontos, parabéns!");
    iniciaJogo();
  }
}