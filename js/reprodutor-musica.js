class ReprodutorMusica {
  constructor() {
    this.listaMusicas = CONFIGURACOES.caminhosMusicas;
    this.indiceMusicaAtual = 0;
    this.musicasTocadas = [];
    this.audio = Utilitarios.criarAudio(this.listaMusicas[this.indiceMusicaAtual]);
    this.audio.loop = true;
    this.estaTocando = false;
  }

  iniciarReproducao() {
    try {
      this.audio
        .play()
        .then(() => {
          this.estaTocando = true;
        })
        .catch((erro) => {
          Utilitarios.tratarErroAudio(erro, "Erro ao iniciar música");
        });
    } catch (erro) {
      Utilitarios.tratarErroAudio(erro, "Erro geral ao iniciar música");
    }
  }

  pausarReproducao() {
    this.audio.pause();
    this.estaTocando = false;
  }

  pararReproducao() {
    this.audio.pause();
    this.audio.currentTime = 0;
    this.estaTocando = false;
  }

  trocarMusicaAleatoria() {
    const musicasDisponiveis = this.listaMusicas.filter((_, indice) => indice !== this.indiceMusicaAtual);

    // Reset da lista se todas foram tocadas
    if (this.musicasTocadas.length === this.listaMusicas.length - 1) {
      this.musicasTocadas = [];
    }

    const indiceAleatorio = Math.floor(Math.random() * musicasDisponiveis.length);
    const novaMusicaUrl = musicasDisponiveis[indiceAleatorio];
    this.indiceMusicaAtual = this.listaMusicas.indexOf(novaMusicaUrl);

    this.musicasTocadas.push(novaMusicaUrl);

    const estavaTocandoAntes = this.estaTocando;
    this.audio.src = novaMusicaUrl;

    if (estavaTocandoAntes) {
      this.iniciarReproducao();
    }
  }

  obterEstadoReproducao() {
    return this.estaTocando;
  }

  obterMusicaAtual() {
    return this.listaMusicas[this.indiceMusicaAtual];
  }
}
