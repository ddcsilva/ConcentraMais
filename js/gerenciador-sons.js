class GerenciadorSons {
  constructor() {
    this.sons = {
      iniciar: Utilitarios.criarAudio(CONFIGURACOES.caminhosSons.iniciar),
      pausar: Utilitarios.criarAudio(CONFIGURACOES.caminhosSons.pausar),
      termino: Utilitarios.criarAudio(CONFIGURACOES.caminhosSons.termino),
    };
  }

  tocarSom(tipoSom) {
    try {
      const som = this.sons[tipoSom];
      if (som) {
        som.currentTime = 0;
        som.play().catch((erro) => {
          Utilitarios.tratarErroAudio(erro, `Erro ao tocar som ${tipoSom}`);
        });
      }
    } catch (erro) {
      Utilitarios.tratarErroAudio(erro, `Erro geral ao tocar som ${tipoSom}`);
    }
  }

  tocarSomIniciar() {
    this.tocarSom("iniciar");
  }

  tocarSomPausar() {
    this.tocarSom("pausar");
  }

  tocarSomTermino() {
    this.tocarSom("termino");
  }
}
