class ControladorInterface {
  constructor() {
    this.elementos = this.obterElementosDOM();
    this.inicializarEventosModal();
  }

  obterElementosDOM() {
    return {
      html: document.querySelector("html"),
      frase: document.querySelector(".frase"),
      botoes: document.querySelectorAll(".botao"),
      botaoIniciarPausar: document.querySelector("#iniciar-pausar"),
      botaoReiniciar: document.querySelector("#reiniciar"),
      inputMusica: document.querySelector("#alternancia-musica"),
      displayTemporizador: document.querySelector("#temporizador"),
      iconeInformativo: document.querySelector("#info-icon"),
      modal: document.querySelector("#modal-explicacao"),
      botaoFecharModal: document.querySelector("#fechar-modal"),
      rotuloMusica: document.querySelector(".rotulo-alternancia"),
      botaoShuffle: document.querySelector("#botao-shuffle"),
      circuloProgresso: document.querySelector("#circulo-progresso"),

      // Elementos de estatísticas
      botaoEstatisticas: document.querySelector("#botao-estatisticas"),
      modalEstatisticas: document.querySelector("#modal-estatisticas"),
      botaoFecharModalEstatisticas: document.querySelector("#fechar-modal-estatisticas"),
      exportarDados: document.querySelector("#exportar-dados"),
      resetarEstatisticas: document.querySelector("#resetar-estatisticas"),

      // Elementos de dados estatísticos
      sessoesHoje: document.querySelector("#sessoes-hoje"),
      tempoHoje: document.querySelector("#tempo-hoje"),
      sequenciaAtual: document.querySelector("#sequencia-atual"),
      totalSessoes: document.querySelector("#total-sessoes"),
      tempoTotal: document.querySelector("#tempo-total"),
      melhorSequencia: document.querySelector("#melhor-sequencia"),
      diasAtivos: document.querySelector("#dias-ativos"),
      graficoSemana: document.querySelector("#grafico-semana"),
    };
  }

  inicializarEventosModal() {
    this.elementos.iconeInformativo.addEventListener("click", () => this.abrirModal());
    this.elementos.botaoFecharModal.addEventListener("click", () => this.fecharModal());

    // Eventos do modal de estatísticas
    this.elementos.botaoEstatisticas.addEventListener("click", () => this.abrirModalEstatisticas());
    this.elementos.botaoFecharModalEstatisticas.addEventListener("click", () => this.fecharModalEstatisticas());

    window.addEventListener("click", (evento) => {
      if (evento.target === this.elementos.modal) {
        this.fecharModal();
      }
      if (evento.target === this.elementos.modalEstatisticas) {
        this.fecharModalEstatisticas();
      }
    });
  }

  // === MÉTODOS DE ATUALIZAÇÃO DA INTERFACE ===
  atualizarDisplayTempo(tempoEmSegundos) {
    this.elementos.displayTemporizador.textContent = Utilitarios.formatarTempo(tempoEmSegundos);
  }

  atualizarModoVisual(modo) {
    this.elementos.html.setAttribute("data-modo", modo);
    this.elementos.frase.innerHTML = CONFIGURACOES.frases[modo] || "";
  }

  atualizarSelecaoBotaoModo(modoSelecionado) {
    this.elementos.botoes.forEach((botao) => {
      botao.classList.remove("selecionado");
      if (botao.getAttribute("data-modo") === modoSelecionado) {
        botao.classList.add("selecionado");
      }
    });
  }

  atualizarBotaoIniciarPausar(estaRodando) {
    const icone = estaRodando ? "pause" : "play";
    const texto = estaRodando ? "Pausar" : "Iniciar";
    this.elementos.botaoIniciarPausar.innerHTML = `<i class="fas fa-${icone} icone-botao"></i> ${texto}`;
  }

  // === MÉTODOS DO INDICADOR DE PROGRESSO ===
  atualizarProgresso(tempoRestante, tempoTotal) {
    if (!this.elementos.circuloProgresso) return;

    const progresso = 1 - tempoRestante / tempoTotal;
    const circunferencia = 2 * Math.PI * 80; // raio = 80 (para width/height de 160px)
    const offset = circunferencia * (1 - progresso);

    this.elementos.circuloProgresso.style.strokeDashoffset = offset;
  }

  reiniciarProgresso() {
    if (!this.elementos.circuloProgresso) return;

    this.elementos.circuloProgresso.style.strokeDashoffset = 502; // circunferência completa
    this.elementos.circuloProgresso.classList.remove("completo");
  }

  animarProgressoCompleto() {
    if (!this.elementos.circuloProgresso) return;

    this.elementos.circuloProgresso.classList.add("completo");

    // Remover a classe após a animação
    setTimeout(() => {
      this.elementos.circuloProgresso.classList.remove("completo");
    }, 600);
  }

  // === MÉTODOS DE CONTROLE DE ESTADO DOS ELEMENTOS ===
  habilitarControlesMusica(habilitar) {
    this.elementos.inputMusica.disabled = !habilitar;
    this.elementos.botaoShuffle.disabled = !habilitar;

    this.elementos.rotuloMusica.classList.toggle("desabilitado", !habilitar);
    this.elementos.inputMusica.classList.toggle("desabilitado", !habilitar);
    this.elementos.botaoShuffle.classList.toggle("desabilitado", !habilitar);
  }

  habilitarBotaoReiniciar(habilitar) {
    this.elementos.botaoReiniciar.disabled = !habilitar;
    this.elementos.botaoReiniciar.classList.toggle("desabilitado", !habilitar);
  }

  habilitarBotoesModos(habilitar) {
    this.elementos.botoes.forEach((botao) => {
      botao.disabled = !habilitar;
      botao.classList.toggle("desabilitado", !habilitar);
    });
  }

  // === MÉTODOS DO MODAL ===
  abrirModal() {
    this.elementos.modal.style.display = "flex";
  }

  fecharModal() {
    this.elementos.modal.style.display = "none";
  }

  // === MÉTODOS DE CONTROLE DE MÚSICA ===
  desmarcarCheckboxMusica() {
    this.elementos.inputMusica.checked = false;
  }

  verificarMusicaHabilitada() {
    return this.elementos.inputMusica.checked;
  }

  // === MÉTODOS PARA ADICIONAR EVENT LISTENERS ===
  adicionarListenerBotoesModos(callback) {
    this.elementos.botoes.forEach((botao) => {
      botao.addEventListener("click", () => {
        const modo = botao.getAttribute("data-modo");
        callback(modo);
      });
    });
  }

  adicionarListenerBotaoIniciarPausar(callback) {
    this.elementos.botaoIniciarPausar.addEventListener("click", callback);
  }

  adicionarListenerBotaoReiniciar(callback) {
    this.elementos.botaoReiniciar.addEventListener("click", callback);
  }

  adicionarListenerCheckboxMusica(callback) {
    this.elementos.inputMusica.addEventListener("change", callback);
  }

  adicionarListenerBotaoShuffle(callback) {
    this.elementos.botaoShuffle.addEventListener("click", callback);
  }

  // === MÉTODOS DO MODAL DE ESTATÍSTICAS ===
  abrirModalEstatisticas() {
    this.elementos.modalEstatisticas.style.display = "flex";
  }

  fecharModalEstatisticas() {
    this.elementos.modalEstatisticas.style.display = "none";
  }

  // === MÉTODOS PARA ATUALIZAR ESTATÍSTICAS ===
  atualizarEstatisticasInterface(estatisticasHoje, estatisticasGerais, dadosSemana, gerenciadorEstatisticas) {
    // Atualizar estatísticas de hoje
    this.elementos.sessoesHoje.textContent = estatisticasHoje.sessoes;
    this.elementos.tempoHoje.textContent = gerenciadorEstatisticas.formatarTempo(estatisticasHoje.tempo);
    this.elementos.sequenciaAtual.textContent = estatisticasHoje.sequencia;

    // Atualizar estatísticas gerais
    this.elementos.totalSessoes.textContent = estatisticasGerais.totalSessoes;
    this.elementos.tempoTotal.textContent = gerenciadorEstatisticas.formatarTempo(estatisticasGerais.tempoTotal);
    this.elementos.melhorSequencia.textContent = estatisticasGerais.melhorSequencia;
    this.elementos.diasAtivos.textContent = estatisticasGerais.diasAtivos;

    // Atualizar gráfico da semana
    this.atualizarGraficoSemana(dadosSemana, gerenciadorEstatisticas);
  }

  atualizarGraficoSemana(dadosSemana, gerenciadorEstatisticas) {
    this.elementos.graficoSemana.innerHTML = "";

    // Encontrar o valor máximo para normalizar as barras
    const maxSessoes = Math.max(...dadosSemana.map((dia) => dia.sessoes), 1);

    dadosSemana.forEach((dia) => {
      const barraDia = document.createElement("div");
      barraDia.className = "barra-dia";

      const barra = document.createElement("div");
      barra.className = `barra ${dia.sessoes === 0 ? "sem-dados" : ""}`;

      // Calcular altura da barra (mínimo 4px, máximo 80px)
      const altura = dia.sessoes === 0 ? 4 : Math.max(4, (dia.sessoes / maxSessoes) * 80);
      barra.style.height = `${altura}px`;

      // Criar tooltip
      const tooltip = document.createElement("div");
      tooltip.className = "tooltip-barra";
      tooltip.textContent = `${dia.sessoes} sessões • ${gerenciadorEstatisticas.formatarTempo(dia.tempo)}`;
      barra.appendChild(tooltip);

      const labelDia = document.createElement("div");
      labelDia.className = "label-dia";
      labelDia.textContent = dia.diaSemana;

      barraDia.appendChild(barra);
      barraDia.appendChild(labelDia);
      this.elementos.graficoSemana.appendChild(barraDia);
    });
  }

  // === MÉTODOS PARA ADICIONAR EVENT LISTENERS DE ESTATÍSTICAS ===
  adicionarListenerExportarDados(callback) {
    this.elementos.exportarDados.addEventListener("click", callback);
  }

  adicionarListenerResetarEstatisticas(callback) {
    this.elementos.resetarEstatisticas.addEventListener("click", callback);
  }
}
