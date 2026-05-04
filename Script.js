import { gerarTreinoInteligente } from "./engine.js";
import { salvar, carregar } from "./storage.js";

let user = carregar("user") || {
  nivel: "iniciante",
  objetivo: "emagrecer",
  tempo: 20
};

let historico = carregar("historico") || {};

function iniciarTreino() {
  let treino = gerarTreinoInteligente(user, historico);
  window.treinoAtual = treino;

  renderTreino(treino);
}

function renderTreino(treino) {
  const ul = document.getElementById("listaTreino");
  ul.innerHTML = "";

  treino.forEach((t, i) => {
    let li = document.createElement("li");

    li.innerHTML = `
      ${t.nome} - ${t.series}x${t.reps}
      <button onclick="marcar(${i})">✔</button>
    `;

    ul.appendChild(li);
  });
}

function marcar(i) {
  let t = window.treinoAtual[i];
  t.concluido = !t.concluido;
  renderTreino(window.treinoAtual);
}

function finalizar() {
  window.treinoAtual.forEach(t => {
    historico[t.nome] = {
      reps: t.reps,
      sucesso: t.concluido
    };
  });

  salvar("historico", historico);
}
