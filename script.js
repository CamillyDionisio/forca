//para te ajudar na contagem de xp, não há código para diferenciação de letra maiúscula ou minúscula e nem com acentuação.

//20 palavras, 3 temas, ainda sem acesso a dicas
const cores = ["verde", "vermelho", "azul", "branco", "preto"];
let palavraSecreta =
  cores[Math.floor(Math.random() * cores.length)];

const pais = ["brasil", "alemanha", "angola", "argentina", "chile", "egito", "iraque", "cuba"];
 palavraSecreta =
    pais[Math.floor(Math.random() * pais.length)];

const animal = ["cachorro", "gato", "peixe", "cobra", "mosca"];
 palavraSecreta =
      animal[Math.floor(Math.random() * animal.length)];

const letrasErradas = [];
const letrasCorretas = [];

document.addEventListener("keydown", (evento) => {
  const codigo = evento.keyCode; // 65 - 90 (intervalo de A até Z, não permitindo números)
  if (isLetra(codigo)) {
    const letra = evento.key;
    if (letrasErradas.includes(letra)) {
      mostrarAvisoLetraRepetida();
    } else {
      if (palavraSecreta.includes(letra)) {
        letrasCorretas.push(letra);
      } else {
        letrasErradas.push(letra);
      }
    }
    atualizarJogo();
  }
});

function atualizarJogo() {
  mostrarLetrasErradas();
  mostrarLetrasCertas();
  desenharForca();
  checarJogo();
}

function mostrarLetrasErradas() {
  const div = document.querySelector(".letras-erradas-container");
  div.innerHTML = "<h3>Histórico de letras</h3>";
  letrasErradas.forEach((letra) => {
    div.innerHTML += `<span>${letra}</span>`;
  });
}

function mostrarLetrasCertas() {
  const container = document.querySelector(".palavra-secreta-container");
  container.innerHTML = "";
  palavraSecreta.split("").forEach((letra) => {
    if (letrasCorretas.includes(letra)) {
      container.innerHTML += `<span>${letra}</span>`;
    } else {
      container.innerHTML += `<span>_</span>`;
    }
  });
}

function checarJogo() {
  let mensagem = "";
  const container = document.querySelector(".palavra-secreta-container");
  const partesCorpo = document.querySelectorAll(".forca-parte");

// condição de derrota
  if (letrasErradas.length === partesCorpo.length) {
    mensagem = "Fim de jogo! Você perdeu!";
  }

//condição de vitória
  if (palavraSecreta === container.innerText) {
    mensagem = "Parabéns! Você ganhou!";
  }

  if (mensagem) {
    document.querySelector("#mensagem").innerHTML = mensagem;
    document.querySelector(".popup-container").style.display = "flex";
  }
}

//desenhar uma parte do corpo caso o usuário erre
function desenharForca() {
  const partesCorpo = document.querySelectorAll(".forca-parte");
  for (let i = 0; i < letrasErradas.length; i++) {
    partesCorpo[i].style.display = "block";
  }
}

//aviso letra repetida
function mostrarAvisoLetraRepetida() {
  const aviso = document.querySelector(".aviso-palavra-repetida");
  aviso.classList.add("show");
  setTimeout(() => {
    aviso.classList.remove("show");
  }, 1000);
}

function isLetra(codigo) {
  return codigo >= 65 && codigo <= 90;
}

//possibilidade de reicinar o jogo
function reiniciarJogo() {
  window.location.reload();
}