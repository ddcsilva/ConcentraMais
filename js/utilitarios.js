class Utilitarios {
  static formatarTempo(segundos) {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
    return `${minutos.toString().padStart(2, "0")}:${segundosRestantes.toString().padStart(2, "0")}`;
  }

  static reproduzirSom(caminhoAudio, volume = 1.0) {
    try {
      const audio = new Audio(caminhoAudio);
      audio.volume = volume;
      audio.play().catch((erro) => {
        console.warn("Erro ao reproduzir som:", erro);
      });
    } catch (erro) {
      console.warn("Erro ao carregar áudio:", erro);
    }
  }

  // Atualizar ano dinamicamente no rodapé
  static atualizarAnoAtual() {
    const elementoAno = document.getElementById("ano-atual");
    if (elementoAno) {
      elementoAno.textContent = new Date().getFullYear();
    }
  }

  // Inicializar utilidades gerais
  static inicializar() {
    // Atualizar ano quando a página carregar
    this.atualizarAnoAtual();

    // Atualizar ano a cada ano (útil para aplicações que ficam abertas por muito tempo)
    const agora = new Date();
    const proximoAno = new Date(agora.getFullYear() + 1, 0, 1);
    const tempoAtéProximoAno = proximoAno.getTime() - agora.getTime();

    setTimeout(() => {
      this.atualizarAnoAtual();
      // Configurar atualização anual
      setInterval(() => this.atualizarAnoAtual(), 365 * 24 * 60 * 60 * 1000);
    }, tempoAtéProximoAno);
  }

  static criarAudio(caminho) {
    const audio = new Audio(caminho);
    audio.preload = "auto";
    return audio;
  }

  static tratarErroAudio(erro, mensagem = "Erro ao reproduzir áudio") {
    console.warn(`${mensagem}:`, erro);
  }
}
