let xp = 0;
let level = 1;
let streak = 0;

const exercicios = {
  nenhum: [
    "Flexão", "Agachamento", "Prancha", "Burpee",
    "Abdominal", "Afundo", "Mountain climber"
  ],
  halter: [
    "Supino com halter", "Rosca bíceps",
    "Elevação lateral", "Tríceps",
    "Agachamento com peso"
  ]
};

function abrirConfig() {
  document.getElementById("home").classList.add("hidden");
  document.getElementById("config").classList.remove("hidden");
}

function gerarTreino() {
  const nivel = document.getElementById("nivel").value;
  const equipamento = document.getElementById("equipamento").value;

  let lista = exercicios[equipamento];
  let quantidade = 5;

  if (nivel === "intermediario") quantidade = 7;
  if (nivel === "avancado") quantidade = 9;

  let treino = [];

  for (let i = 0; i < quantidade; i++) {
    let ex = lista[Math.floor(Math.random() * lista.length)];
    treino.push(`${ex} - 3x10`);
  }

  const ul = document.getElementById("listaTreino");
  ul.innerHTML = "";

  treino.forEach(t => {
    let li = document.createElement("li");
    li.innerText = t;
    ul.appendChild(li);
  });

  document.getElementById("config").classList.add("hidden");
  document.getElementById("treino").classList.remove("hidden");
}

function finalizarTreino() {
  xp += 20;
  streak += 1;

  if (xp >= 100) {
    level++;
    xp = 0;
    alert("🔥 Subiu de nível!");
  }

  atualizarUI();

  document.getElementById("treino").classList.add("hidden");
  document.getElementById("home").classList.remove("hidden");
}

function atualizarUI() {
  document.getElementById("xpBar").style.width = xp + "%";
  document.getElementById("level").innerText = level;
  document.getElementById("streak").innerText = streak;
}

atualizarUI();
