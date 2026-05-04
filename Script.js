let data = JSON.parse(localStorage.getItem("app")) || {
  xp: 0,
  level: 1,
  streak: 0,
  lastDay: null
};

const exercicios = {
  nenhum: ["Flexão", "Agachamento", "Prancha", "Burpee", "Abdominal", "Afundo"],
  halter: ["Supino", "Rosca", "Tríceps", "Elevação lateral", "Agachamento peso"]
};

function salvar() {
  localStorage.setItem("app", JSON.stringify(data));
}

function abrirConfig() {
  document.getElementById("home").classList.add("hidden");
  document.getElementById("config").classList.remove("hidden");
}

function gerarTreino() {
  const nivel = document.getElementById("nivel").value;
  const equipamento = document.getElementById("equipamento").value;

  let base = exercicios[equipamento];

  let quantidade = 5 + data.level; // fica mais difícil com o tempo
  if (nivel === "avancado") quantidade += 2;

  let treino = [];

  for (let i = 0; i < quantidade; i++) {
    let ex = base[Math.floor(Math.random() * base.length)];
    let reps = 8 + data.level; // progressivo
    treino.push({ nome: ex, reps: reps, feito: false });
  }

  renderTreino(treino);

  window.treinoAtual = treino;

  document.getElementById("config").classList.add("hidden");
  document.getElementById("treino").classList.remove("hidden");
}

function renderTreino(treino) {
  const ul = document.getElementById("listaTreino");
  ul.innerHTML = "";

  treino.forEach((t, i) => {
    let li = document.createElement("li");

    li.innerHTML = `
      ${t.nome} - 3x${t.reps}
      <button onclick="toggleEx(${i})">✔</button>
    `;

    ul.appendChild(li);
  });
}

function toggleEx(index) {
  let t = window.treinoAtual[index];
  t.feito = !t.feito;

  renderTreino(window.treinoAtual);
}

function finalizarTreino() {
  let feitos = window.treinoAtual.filter(t => t.feito).length;
  let total = window.treinoAtual.length;

  let bonus = Math.floor((feitos / total) * 30);

  data.xp += 20 + bonus;

  // STREAK INTELIGENTE
  let hoje = new Date().toDateString();

  if (data.lastDay !== hoje) {
    data.streak += 1;
    data.lastDay = hoje;
  }

  if (data.xp >= 100) {
    data.level++;
    data.xp = 0;
    alert("🔥 LEVEL UP!");
  }

  salvar();
  atualizarUI();

  document.getElementById("treino").classList.add("hidden");
  document.getElementById("home").classList.remove("hidden");
}

// TIMER DESCANSO
let timer;
function iniciarDescanso(segundos = 30) {
  clearInterval(timer);

  timer = setInterval(() => {
    segundos--;
    console.log("Descanso:", segundos);

    if (segundos <= 0) {
      clearInterval(timer);
      alert("Bora pro próximo!");
    }
  }, 1000);
}

function atualizarUI() {
  document.getElementById("xpBar").style.width = data.xp + "%";
  document.getElementById("level").innerText = data.level;
  document.getElementById("streak").innerText = data.streak;
}

atualizarUI();
