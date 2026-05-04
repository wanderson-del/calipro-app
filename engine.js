export function gerarTreinoInteligente(user, historico) {
  const base = {
    peito: ["Flexão", "Dips"],
    perna: ["Agachamento", "Afundo"],
    core: ["Prancha", "Abdominal"],
    cardio: ["Burpee", "Polichinelo"]
  };

  let treino = [];

  let divisao = escolherDivisao(user);

  divisao.forEach(grupo => {
    let exercicios = base[grupo];

    exercicios.forEach(ex => {
      let dificuldade = ajustarDificuldade(ex, historico);

      treino.push({
        nome: ex,
        series: 3,
        reps: dificuldade,
        concluido: false
      });
    });
  });

  return treino;
}

function escolherDivisao(user) {
  if (user.tempo <= 15) return ["full"];
  if (user.nivel === "iniciante") return ["peito", "perna"];
  if (user.nivel === "intermediario") return ["peito", "core", "perna"];
  return ["peito", "perna", "core", "cardio"];
}

function ajustarDificuldade(ex, historico) {
  let last = historico[ex];

  if (!last) return 10;

  if (last.sucesso) return last.reps + 2;
  return Math.max(6, last.reps - 2);
        }
