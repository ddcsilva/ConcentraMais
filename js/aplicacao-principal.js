class ConcentraMais {
  constructor() {
    this.interface = new ControladorInterface();
    this.gerenciadorSons = new GerenciadorSons();
    this.gerenciadorNotificacoes = new GerenciadorNotificacoes();
    this.gerenciadorEstatisticas = new GerenciadorEstatisticas();
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

    // Eventos de estatísticas
    this.interface.adicionarListenerExportarDados(() => this.aoExportarDados());
    this.interface.adicionarListenerResetarEstatisticas(() => this.aoResetarEstatisticas());
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

    // Registrar sessão nas estatísticas (só para modo foco)
    if (modoAtual === "foco") {
      const tempoEmMinutos = CONFIGURACOES.tempos[modoAtual] / 60;
      this.gerenciadorEstatisticas.registrarSessaoCompleta(modoAtual, tempoEmMinutos);
    }

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

  // === MÉTODOS DE ESTATÍSTICAS ===
  aoExportarDados() {
    const dados = this.gerenciadorEstatisticas.exportarDados();
    const dataFormatada = new Date().toLocaleDateString("pt-BR");
    const nomeArquivo = `concentraMais_estatisticas_${dataFormatada.replace(/\//g, "-")}.json`;

    const blob = new Blob([JSON.stringify(dados, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = nomeArquivo;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  aoResetarEstatisticas() {
    if (confirm("Tem certeza que deseja resetar todas as estatísticas? Esta ação não pode ser desfeita.")) {
      this.gerenciadorEstatisticas.resetarEstatisticas();
      this.atualizarEstatisticasInterface();
      alert("Estatísticas resetadas com sucesso!");
    }
  }

  atualizarEstatisticasInterface() {
    const estatisticasHoje = this.gerenciadorEstatisticas.obterEstatisticasHoje();
    const estatisticasGerais = this.gerenciadorEstatisticas.obterEstatisticasGerais();
    const dadosSemana = this.gerenciadorEstatisticas.obterEstatisticasSemana();

    this.interface.atualizarEstatisticasInterface(
      estatisticasHoje,
      estatisticasGerais,
      dadosSemana,
      this.gerenciadorEstatisticas
    );
  }
}

// Interceptar evento de abertura do modal de estatísticas para atualizar dados
document.addEventListener("DOMContentLoaded", () => {
  // Inicializar utilidades gerais (ano dinâmico, etc.)
  Utilitarios.inicializar();

  // Inicializar aplicação principal
  const app = new ConcentraMais();

  // Adicionar listener para atualizar estatísticas ao abrir o modal
  const botaoEstatisticas = document.querySelector("#botao-estatisticas");
  if (botaoEstatisticas) {
    botaoEstatisticas.addEventListener("click", () => {
      setTimeout(() => app.atualizarEstatisticasInterface(), 100);
    });
  }
});
