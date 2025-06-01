class Temporizador {
  constructor(aoFazerTick, aoCompletar) {
    this.tempoRestante = 0;
    this.idIntervalo = null;
    this.estaRodando = false;
    this.modoAtual = "foco";
    this.aoFazerTick = aoFazerTick;
    this.aoCompletar = aoCompletar;
  }

  iniciar() {
    if (!this.estaRodando && this.tempoRestante > 0) {
      this.estaRodando = true;
      this.idIntervalo = setInterval(() => {
        this.executarTick();
      }, 1000);
    }
  }

  pausar() {
    if (this.estaRodando) {
      this.estaRodando = false;
      clearInterval(this.idIntervalo);
      this.idIntervalo = null;
    }
  }

  reiniciar(novoModo = null) {
    this.pausar();
    if (novoModo) {
      this.modoAtual = novoModo;
    }
    this.tempoRestante = CONFIGURACOES.tempos[this.modoAtual];
    this.aoFazerTick(this.tempoRestante);
  }

  executarTick() {
    if (this.tempoRestante <= 0) {
      this.pausar();
      this.aoCompletar();
      return;
    }

    this.tempoRestante--;
    this.aoFazerTick(this.tempoRestante);
  }

  alterarModo(novoModo) {
    this.pausar();
    this.modoAtual = novoModo;
    this.reiniciar();
  }

  obterTempoRestante() {
    return this.tempoRestante;
  }

  obterModoAtual() {
    return this.modoAtual;
  }

  obterEstadoExecucao() {
    return this.estaRodando;
  }

  obterTempoFormatado() {
    return Utilitarios.formatarTempo(this.tempoRestante);
  }
}
