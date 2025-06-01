# 🍅 ConcentraMais

<div align="center">

![ConcentraMais Logo](https://img.shields.io/badge/ConcentraMais-Pomodoro%20Timer-6f42c1?style=for-the-badge&logo=clockify&logoColor=white)

**Um aplicativo Pomodoro moderno e completo para maximizar sua produtividade**

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
[![Responsive](https://img.shields.io/badge/Responsive-4CAF50?style=flat-square&logo=responsive&logoColor=white)](https://web.dev/responsive-web-design-basics/)
[![PWA Ready](https://img.shields.io/badge/PWA%20Ready-5A0FC8?style=flat-square&logo=pwa&logoColor=white)](https://web.dev/progressive-web-apps/)

[🚀 Demo Ao Vivo](https://ddcsilva.github.io/concentramais) | [📖 Documentação](#como-usar) | [🐛 Report Bug](https://github.com/ddcsilva/concentramais/issues)

</div>

---

## 📋 Sobre o Projeto

O **ConcentraMais** é um aplicativo web moderno baseado na técnica Pomodoro que ajuda você a manter o foco e aumentar sua produtividade. Desenvolvido com arquitetura modular em JavaScript vanilla, oferece uma experiência completa de gerenciamento de tempo com estatísticas detalhadas e interface responsiva.

### ✨ Por que usar o ConcentraMais?

- 🎯 **Foco Aprimorado**: Técnica Pomodoro comprovada para melhorar concentração
- 📊 **Estatísticas Completas**: Acompanhe seu progresso e mantenha a motivação
- 🎵 **Música Ambiente**: Sons relaxantes para manter você na zona de produtividade
- 📱 **Totalmente Responsivo**: Funciona perfeitamente em qualquer dispositivo
- ♿ **Acessível**: Interface otimizada para leitores de tela e navegação por teclado
- 🌟 **Design Moderno**: Interface elegante com animações suaves

## 🚀 Funcionalidades

### ⏰ **Sistema de Temporizador**
- **Modo Foco**: 25 minutos de concentração intensa
- **Descanso Curto**: 5 minutos para uma pausa rápida
- **Descanso Longo**: 15 minutos para relaxamento completo
- **Indicador Visual**: Anel de progresso em tempo real
- **Controles Intuitivos**: Iniciar, pausar e reiniciar facilmente

### 📊 **Sistema de Estatísticas Avançado**
- **Métricas Diárias**: Sessões completadas e tempo focado hoje
- **Histórico Semanal**: Gráfico interativo dos últimos 7 dias
- **Sequências (Streaks)**: Acompanhe sua consistência
- **Estatísticas Gerais**: Total de sessões, melhor sequência e dias ativos
- **Exportação de Dados**: Baixe suas estatísticas em JSON
- **Reset Seguro**: Opção para recomeçar com confirmação

### 🎵 **Sistema de Áudio**
- **Música de Fundo**: Coleção de músicas relaxantes
- **Modo Shuffle**: Troca automática entre diferentes faixas
- **Sons de Notificação**: Feedback sonoro para início, pausa e conclusão
- **Controle de Volume**: Ajuste automático para não interferir no foco

### 🔔 **Notificações Inteligentes**
- **Notificações do Browser**: Alertas mesmo com a aba em segundo plano
- **Mensagens Contextuais**: Diferentes mensagens para foco e descanso
- **Solicitação de Permissão**: Interface amigável para ativar notificações

### ♿ **Acessibilidade e UX**
- **ARIA Labels**: Compatibilidade total com leitores de tela
- **Navegação por Teclado**: Controle completo sem mouse
- **Alto Contraste**: Cores otimizadas para diferentes necessidades visuais
- **Textos Descritivos**: Instruções claras em todas as funcionalidades

## 🏗️ Arquitetura do Projeto

### 📁 **Estrutura de Arquivos**
```
ConcentraMais/
├── 📄 index.html              # Estrutura HTML semântica
├── 📁 css/                    # Estilos modulares
│   ├── variaveis.css          # Variáveis CSS e temas
│   ├── base.css               # Reset e estilos base
│   ├── layout.css             # Layout e estrutura
│   ├── componentes.css        # Componentes reutilizáveis
│   ├── modal.css              # Estilos dos modais
│   ├── estatisticas.css       # Interface de estatísticas
│   └── responsivo.css         # Media queries
├── 📁 js/                     # JavaScript modular
│   ├── configuracoes.js       # Configurações globais
│   ├── utilitarios.js         # Funções utilitárias
│   ├── gerenciador-sons.js    # Sistema de áudio
│   ├── gerenciador-notificacoes.js  # Sistema de notificações
│   ├── gerenciador-estatisticas.js  # Sistema de estatísticas
│   ├── reprodutor-musica.js   # Player de música
│   ├── temporizador.js        # Lógica do timer
│   ├── controlador-interface.js     # Manipulação do DOM
│   └── aplicacao-principal.js       # Orquestrador principal
├── 📁 sons/                   # Arquivos de áudio
├── 📁 imagens/                # Recursos visuais
├── 📄 README.md               # Documentação
└── 📄 LICENSE                 # Licença MIT
```

### 🧩 **Arquitetura Modular**

O projeto segue uma arquitetura modular bem definida:

- **Separação de Responsabilidades**: Cada módulo JavaScript tem uma função específica
- **Baixo Acoplamento**: Módulos independentes que se comunicam através de interfaces claras
- **Alta Coesão**: Funcionalidades relacionadas agrupadas logicamente
- **Facilidade de Manutenção**: Código organizado e bem documentado

## 🛠️ Tecnologias Utilizadas

### **Frontend**
- **HTML5**: Estrutura semântica com elementos ARIA
- **CSS3**: Flexbox, Grid, Custom Properties, Animações
- **JavaScript ES6+**: Classes, Modules, Arrow Functions, Async/Await

### **Recursos Avançados**
- **LocalStorage**: Persistência de dados do usuário
- **Web Audio API**: Reprodução de sons e músicas
- **Notifications API**: Notificações do browser
- **Service Worker Ready**: Preparado para PWA

### **Ferramentas de Desenvolvimento**
- **Responsive Design**: Mobile-first approach
- **Semantic HTML**: Estrutura acessível e SEO-friendly
- **CSS Architecture**: Metodologia modular e escalável
- **Progressive Enhancement**: Funciona mesmo sem JavaScript

## 📱 Compatibilidade

### **Navegadores Suportados**
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Opera 76+

### **Dispositivos**
- 📱 **Mobile**: iOS 14+, Android 10+
- 💻 **Desktop**: Windows, macOS, Linux
- 📱 **Tablet**: iPad, Android tablets

## 🚀 Como Usar

### **Instalação Local**

1. **Clone o repositório**
   ```bash
   git clone https://github.com/ddcsilva/concentramais.git
   cd concentramais
   ```

2. **Abra no navegador**
   ```bash
   # Opção 1: Abrir diretamente
   open index.html

   # Opção 2: Servidor local (recomendado)
   python -m http.server 8000
   # Acesse: http://localhost:8000
   ```

### **Uso do Aplicativo**

1. **🎯 Escolha o Modo**
   - Clique em "Foco" para sessão de trabalho (25 min)
   - "Descanso Curto" para pausa rápida (5 min)
   - "Descanso Longo" para descanso prolongado (15 min)

2. **▶️ Controle o Timer**
   - Clique "Iniciar" para começar
   - "Pausar" para interromper temporariamente
   - "Reiniciar" para voltar ao início

3. **🎵 Configure o Áudio** (opcional)
   - Ative o toggle "Música" para música de fundo
   - Use o botão shuffle (🔀) para trocar de música

4. **📊 Acompanhe o Progresso**
   - Clique no ícone de gráfico (📊) para ver estatísticas
   - Acompanhe sessões diárias, sequências e histórico

5. **❓ Obtenha Ajuda**
   - Clique no ícone de ajuda (❓) para instruções

## 🎨 Personalização

### **Modificar Tempos Padrão**
Edite o arquivo `js/configuracoes.js`:
```javascript
const CONFIGURACOES = {
  tempos: {
    foco: 25 * 60,           // 25 minutos
    "descanso-curto": 5 * 60, // 5 minutos
    "descanso-longo": 15 * 60 // 15 minutos
  }
};
```

### **Personalizar Mensagens**
Modifique as frases no mesmo arquivo:
```javascript
frases: {
  foco: "Aprimore sua eficiência,<br><strong>concentre-se no essencial</strong>.",
  "descanso-curto": "Que tal uma pausa?<br><strong>Recarregue suas energias</strong>.",
  "descanso-longo": "Parabéns pelo foco!<br><strong>Descanso merecido</strong>."
}
```

### **Adicionar Músicas**
1. Adicione arquivos MP3 na pasta `sons/`
2. Atualize o array em `js/reprodutor-musica.js`:
```javascript
this.musicas = [
  "sons/musica1.mp3",
  "sons/musica2.mp3",
  "sons/sua-nova-musica.mp3"
];
```

## 📊 Estatísticas e Dados

### **Dados Coletados**
- Número de sessões completadas
- Tempo total focado (em minutos)
- Sequências de dias consecutivos
- Histórico dos últimos 7 dias
- Melhor sequência já alcançada

### **Privacidade**
- ✅ Todos os dados ficam no seu dispositivo (LocalStorage)
- ✅ Nenhuma informação é enviada para servidores
- ✅ Você pode exportar ou apagar seus dados a qualquer momento

## 🤝 Contribuindo

Contribuições são muito bem-vindas! Aqui está como você pode ajudar:

### **Reportar Bugs**
1. Vá para a [página de Issues](https://github.com/ddcsilva/concentramais/issues)
2. Clique em "New Issue"
3. Descreva o problema detalhadamente

### **Sugerir Funcionalidades**
1. Abra uma [nova Issue](https://github.com/ddcsilva/concentramais/issues)
2. Use o template de "Feature Request"
3. Explique como a funcionalidade ajudaria os usuários

### **Enviar Código**
1. **Fork** o projeto
2. Crie uma **branch** para sua feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. **Push** para a branch (`git push origin feature/AmazingFeature`)
5. Abra um **Pull Request**

## 📝 Licença

Este projeto está licenciado sob a **MIT License** - veja o arquivo [LICENSE](LICENSE) para detalhes.

### **Licença de Músicas**
As músicas utilizadas são provenientes do [Pixabay](https://pixabay.com/pt), plataforma que oferece conteúdo livre de royalties para uso comercial e pessoal.

## 👨‍💻 Autor

**Danilo Silva**

- 📧 Email: [danilo.silva@msn.com](mailto:danilo.silva@msn.com)
- 💼 LinkedIn: [linkedin.com/in/ddcsilva](https://www.linkedin.com/in/ddcsilva/)
- 🐱 GitHub: [@ddcsilva](https://github.com/ddcsilva)

## 🙏 Agradecimentos

- 🍅 **Francesco Cirillo** - Criador da Técnica Pomodoro
- 🎵 **Pixabay** - Músicas livres de royalties
- 🎨 **Font Awesome** - Ícones utilizados na interface
- 📝 **Google Fonts** - Fonte Montserrat

## 🔮 Roadmap

### **Próximas Funcionalidades**
- [ ] 🌙 Modo escuro/claro
- [ ] 🎨 Temas personalizáveis
- [ ] 📱 Progressive Web App (PWA)
- [ ] 🔄 Sincronização na nuvem
- [ ] 📈 Relatórios semanais/mensais
- [ ] 🎯 Sistema de metas e conquistas
- [ ] 🤖 Integração com APIs de produtividade
- [ ] 🔔 Notificações push

---

<div align="center">

**⭐ Se este projeto te ajudou, considere dar uma estrela!**

[![GitHub stars](https://img.shields.io/github/stars/ddcsilva/concentramais?style=social)](https://github.com/ddcsilva/concentramais/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/ddcsilva/concentramais?style=social)](https://github.com/ddcsilva/concentramais/network)

**Feito com ❤️ e ☕ por [Danilo Silva](https://github.com/ddcsilva)**

</div>