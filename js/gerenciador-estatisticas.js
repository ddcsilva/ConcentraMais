class GerenciadorEstatisticas {
  constructor() {
    this.estatisticas = this.carregarEstatisticas();
    this.inicializarEstatisticasSeNecessario();
  }

  // === CARREGAMENTO E SALVAMENTO ===
  carregarEstatisticas() {
    const dadosSalvos = localStorage.getItem("concentraMais_estatisticas");
    if (dadosSalvos) {
      try {
        return JSON.parse(dadosSalvos);
      } catch (error) {
        console.warn("Erro ao carregar estatísticas:", error);
        return this.criarEstatisticasVazias();
      }
    }
    return this.criarEstatisticasVazias();
  }

  salvarEstatisticas() {
    try {
      localStorage.setItem("concentraMais_estatisticas", JSON.stringify(this.estatisticas));
    } catch (error) {
      console.error("Erro ao salvar estatísticas:", error);
    }
  }

  criarEstatisticasVazias() {
    return {
      sessoesHoje: 0,
      tempoTotalHoje: 0, // em minutos
      sequenciaAtual: 0,
      melhorSequencia: 0,
      totalSessoes: 0,
      tempoTotalGeral: 0, // em minutos
      ultimaData: new Date().toDateString(),
      historicoSemanal: {}, // { 'YYYY-MM-DD': { sessoes: 0, tempo: 0 } }
      datasCompletas: [], // array de datas em que houve atividade
    };
  }

  inicializarEstatisticasSeNecessario() {
    const hoje = new Date().toDateString();

    // Resetar estatísticas diárias se mudou o dia
    if (this.estatisticas.ultimaData !== hoje) {
      // Calcular diferença de dias **antes** de atualizar a última data
      const ultimaDataArmazenada = new Date(this.estatisticas.ultimaData);
      const dataAtual = new Date(hoje);
      const diferencaDias = Math.floor(
        (dataAtual - ultimaDataArmazenada) / (1000 * 60 * 60 * 24)
      );

      this.estatisticas.sessoesHoje = 0;
      this.estatisticas.tempoTotalHoje = 0;

      if (diferencaDias > 1) {
        this.estatisticas.sequenciaAtual = 0;
      }

      this.estatisticas.ultimaData = hoje;
      this.salvarEstatisticas();
    }
  }

  // === REGISTRO DE ATIVIDADES ===
  registrarSessaoCompleta(modo, tempoEmMinutos) {
    if (modo !== "foco") return; // Só conta sessões de foco

    const hoje = new Date().toDateString();
    const chaveData = this.obterChaveData(new Date());

    // Atualizar estatísticas diárias
    this.estatisticas.sessoesHoje++;
    this.estatisticas.tempoTotalHoje += tempoEmMinutos;

    // Atualizar estatísticas gerais
    this.estatisticas.totalSessoes++;
    this.estatisticas.tempoTotalGeral += tempoEmMinutos;

    // Atualizar sequência
    this.estatisticas.sequenciaAtual++;
    if (this.estatisticas.sequenciaAtual > this.estatisticas.melhorSequencia) {
      this.estatisticas.melhorSequencia = this.estatisticas.sequenciaAtual;
    }

    // Atualizar histórico semanal
    if (!this.estatisticas.historicoSemanal[chaveData]) {
      this.estatisticas.historicoSemanal[chaveData] = { sessoes: 0, tempo: 0 };
    }
    this.estatisticas.historicoSemanal[chaveData].sessoes++;
    this.estatisticas.historicoSemanal[chaveData].tempo += tempoEmMinutos;

    // Adicionar data às datas completas se não existir
    if (!this.estatisticas.datasCompletas.includes(chaveData)) {
      this.estatisticas.datasCompletas.push(chaveData);
    }

    this.salvarEstatisticas();
  }

  // === GETTERS PARA ESTATÍSTICAS ===
  obterEstatisticasHoje() {
    return {
      sessoes: this.estatisticas.sessoesHoje,
      tempo: this.estatisticas.tempoTotalHoje,
      sequencia: this.estatisticas.sequenciaAtual,
    };
  }

  obterEstatisticasGerais() {
    return {
      totalSessoes: this.estatisticas.totalSessoes,
      tempoTotal: this.estatisticas.tempoTotalGeral,
      melhorSequencia: this.estatisticas.melhorSequencia,
      diasAtivos: this.estatisticas.datasCompletas.length,
    };
  }

  obterEstatisticasSemana() {
    const hoje = new Date();
    const ultimosSeteDias = [];

    for (let i = 6; i >= 0; i--) {
      const data = new Date(hoje);
      data.setDate(data.getDate() - i);
      const chave = this.obterChaveData(data);

      const dadosDia = this.estatisticas.historicoSemanal[chave] || { sessoes: 0, tempo: 0 };
      ultimosSeteDias.push({
        data: chave,
        diaSemana: this.obterDiaSemanaAbreviado(data),
        sessoes: dadosDia.sessoes,
        tempo: dadosDia.tempo,
      });
    }

    return ultimosSeteDias;
  }

  // === MÉTODOS AUXILIARES ===
  obterChaveData(data) {
    return data.toISOString().split("T")[0]; // YYYY-MM-DD
  }

  obterDiaSemanaAbreviado(data) {
    const dias = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    return dias[data.getDay()];
  }

  formatarTempo(minutos) {
    const horas = Math.floor(minutos / 60);
    const minutosRestantes = minutos % 60;

    if (horas > 0) {
      return `${horas}h ${minutosRestantes}min`;
    }
    return `${minutosRestantes}min`;
  }

  // === MÉTODOS DE RESET (para desenvolvimento/testes) ===
  resetarEstatisticas() {
    this.estatisticas = this.criarEstatisticasVazias();
    this.salvarEstatisticas();
  }

  // === MÉTODO PARA EXPORTAR DADOS ===
  exportarDados() {
    return {
      ...this.estatisticas,
      dataExportacao: new Date().toISOString(),
    };
  }
}
