class GerenciadorNotificacoes {
  constructor() {
    this.permissaoNotificacao = null;
    this.inicializarPermissoes();
  }

  async inicializarPermissoes() {
    // Verificar se o navegador suporta notificações
    if (!("Notification" in window)) {
      console.warn("Este navegador não suporta notificações");
      return;
    }

    // Verificar permissão atual
    this.permissaoNotificacao = Notification.permission;

    // Se ainda não foi decidido, pedir permissão
    if (this.permissaoNotificacao === "default") {
      try {
        this.permissaoNotificacao = await Notification.requestPermission();
      } catch (erro) {
        console.warn("Erro ao solicitar permissão para notificações:", erro);
      }
    }
  }

  mostrarNotificacao(titulo, opcoes = {}) {
    // Verificar se temos permissão
    if (this.permissaoNotificacao !== "granted") {
      console.warn("Permissão para notificações não concedida");
      return;
    }

    try {
      const opcoesNotificacao = {
        icon: "imagens/favicon.ico",
        badge: "imagens/favicon.ico",
        silent: false,
        requireInteraction: true,
        ...opcoes,
      };

      const notificacao = new Notification(titulo, opcoesNotificacao);

      // Auto-fechar após 5 segundos se o usuário não interagir
      setTimeout(() => {
        notificacao.close();
      }, 5000);

      return notificacao;
    } catch (erro) {
      console.warn("Erro ao mostrar notificação:", erro);
    }
  }

  notificarFimSessaoFoco() {
    this.mostrarNotificacao("🎯 Sessão de Foco Concluída!", {
      body: "Parabéns! Você completou 25 minutos de foco. Hora de descansar! 😌",
      tag: "fim-foco",
    });
  }

  notificarFimDescanso(tipoDescanso) {
    const mensagens = {
      "descanso-curto": {
        titulo: "⚡ Descanso Curto Finalizado!",
        corpo: "5 minutos de descanso terminaram. Hora de voltar ao foco! 💪",
      },
      "descanso-longo": {
        titulo: "🌟 Descanso Longo Finalizado!",
        corpo: "15 minutos de descanso terminaram. Você está renovado para focar! 🚀",
      },
    };

    const mensagem = mensagens[tipoDescanso];
    if (mensagem) {
      this.mostrarNotificacao(mensagem.titulo, {
        body: mensagem.corpo,
        tag: `fim-${tipoDescanso}`,
      });
    }
  }

  obterStatusPermissao() {
    return this.permissaoNotificacao;
  }

  temPermissao() {
    return this.permissaoNotificacao === "granted";
  }
}
