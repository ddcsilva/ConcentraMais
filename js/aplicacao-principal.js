class ConcentraMais {
  constructor() {
    this.interface = new ControladorInterface();
    this.gerenciadorSons = new GerenciadorSons();
    this.gerenciadorNotificacoes = new GerenciadorNotificacoes();
    this.reprodutorMusica = new ReprodutorMusica();

    this.temporizador = new Temporizador(
      (tempo) => this.aoAtualizarTempo(tempo),
      () => this.aoCompletarTempo()
    );

    this.inicializarAplicacao();
  }

  inicializarAplicacao() {
    // Configurar estado inicial
    this.temporizador.reiniciar("foco");
    this.interface.atualizarModoVisual("foco");
    this.interface.atualizarSelecaoBotaoModo("foco");
    this.interface.habilitarControlesMusica(false);
    this.interface.habilitarBotaoReiniciar(false);
    this.interface.reiniciarProgresso();

    // Registrar todos os eventos
    this.registrarEventos();
  }

  registrarEventos() {
    this.interface.adicionarListenerBotoesModos((modo) => this.aoAlterarModo(modo));
    this.interface.adicionarListenerBotaoIniciarPausar(() => this.aoClicarIniciarPausar());
    this.interface.adicionarListenerBotaoReiniciar(() => this.aoClicarReiniciar());
    this.interface.adicionarListenerCheckboxMusica(() => this.aoAlternarMusica());
    this.interface.adicionarListenerBotaoShuffle(() => this.aoClicarShuffle());
  }

  aoAlterarModo(modo) {
    this.temporizador.alterarModo(modo);
    this.interface.atualizarModoVisual(modo);
    this.interface.atualizarSelecaoBotaoModo(modo);
    this.interface.atualizarBotaoIniciarPausar(false);
    this.interface.habilitarBotoesModos(true);
    this.interface.habilitarControlesMusica(false);
    this.interface.habilitarBotaoReiniciar(false);
    this.interface.reiniciarProgresso();
    this.pararTodaMusica();
  }

  aoClicarIniciarPausar() {
    if (this.temporizador.obterEstadoExecucao()) {
      this.pausarTemporizador();
    } else {
      this.iniciarTemporizador();
    }
  }

  iniciarTemporizador() {
    this.temporizador.iniciar();
    this.gerenciadorSons.tocarSomIniciar();
    this.interface.atualizarBotaoIniciarPausar(true);
    this.interface.habilitarBotoesModos(false);
    this.interface.habilitarControlesMusica(true);
    this.interface.habilitarBotaoReiniciar(false);
  }

  pausarTemporizador() {
    this.temporizador.pausar();
    this.gerenciadorSons.tocarSomPausar();
    this.interface.atualizarBotaoIniciarPausar(false);
    this.interface.habilitarBotoesModos(true);
    this.interface.habilitarControlesMusica(false);
    this.interface.habilitarBotaoReiniciar(true);
    this.pararTodaMusica();
  }

  aoClicarReiniciar() {
    this.temporizador.reiniciar();
    this.interface.atualizarBotaoIniciarPausar(false);
    this.interface.habilitarBotoesModos(true);
    this.interface.habilitarControlesMusica(false);
    this.interface.habilitarBotaoReiniciar(false);
    this.interface.reiniciarProgresso();
    this.pararTodaMusica();
  }

  aoAlternarMusica() {
    if (this.interface.verificarMusicaHabilitada()) {
      this.reprodutorMusica.iniciarReproducao();
    } else {
      this.reprodutorMusica.pausarReproducao();
    }
  }

  aoClicarShuffle() {
    this.reprodutorMusica.trocarMusicaAleatoria();
  }

  pararTodaMusica() {
    this.reprodutorMusica.pararReproducao();
    this.interface.desmarcarCheckboxMusica();
  }

  aoAtualizarTempo(tempoEmSegundos) {
    const modoAtual = this.temporizador.obterModoAtual();
    const tempoTotal = CONFIGURACOES.tempos[modoAtual];

    // Atualizar display do tempo
    this.interface.atualizarDisplayTempo(tempoEmSegundos);

    // Atualizar indicador de progresso
    this.interface.atualizarProgresso(tempoEmSegundos, tempoTotal);
  }

  aoCompletarTempo() {
    const modoAtual = this.temporizador.obterModoAtual();

    // Animar conclusão do progresso
    this.interface.animarProgressoCompleto();

    // Tocar som de término
    this.gerenciadorSons.tocarSomTermino();

    // Mostrar notificação baseada no modo
    if (modoAtual === "foco") {
      this.gerenciadorNotificacoes.notificarFimSessaoFoco();
    } else {
      this.gerenciadorNotificacoes.notificarFimDescanso(modoAtual);
    }

    // Atualizar interface
    this.interface.atualizarBotaoIniciarPausar(false);
    this.interface.habilitarBotoesModos(true);
    this.interface.habilitarControlesMusica(false);
    this.interface.habilitarBotaoReiniciar(false);
    this.pararTodaMusica();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new ConcentraMais();
});
