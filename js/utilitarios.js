class Utilitarios {
  static formatarTempo(segundos) {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
    return `${String(minutos).padStart(2, "0")}:${String(segundosRestantes).padStart(2, "0")}`;
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
