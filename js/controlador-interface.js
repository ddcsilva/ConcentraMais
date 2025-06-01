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
    };
  }

  inicializarEventosModal() {
    this.elementos.iconeInformativo.addEventListener("click", () => this.abrirModal());
    this.elementos.botaoFecharModal.addEventListener("click", () => this.fecharModal());
    window.addEventListener("click", (evento) => {
      if (evento.target === this.elementos.modal) {
        this.fecharModal();
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
}
