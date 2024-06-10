const html = document.querySelector('html');
const frase = document.querySelector('.frase');
const botoes = document.querySelectorAll('.botao');
const botaoIniciarPausar = document.querySelector('#iniciar-pausar');
const botaoReiniciar = document.querySelector('#reiniciar');
const inputMusica = document.querySelector('#alternancia-musica');
const displayTemporizador = document.querySelector('#temporizador');

const musica = new Audio('sons/lofi-study.mp3');
musica.loop = true;

const somIniciar = new Audio('sons/start.wav');
const somPausar = new Audio('sons/pause.wav');
const somTermino = new Audio('sons/finish.mp3');

let intervaloId = null;
let tempoRestante;

const tempos = {
    'foco': 25 * 60,
    'descanso-curto': 5 * 60,
    'descanso-longo': 15 * 60
};

const frases = {
    'foco': 'Aprimore sua eficiência,<br> <strong>concentre-se no essencial</strong>.',
    'descanso-curto': 'Aproveite um breve descanso,<br> para <strong>recarregar suas energias</strong>.',
    'descanso-longo': 'Faça uma pausa prolongada,<br> e volte com <strong>ainda mais foco</strong>.'
};

inputMusica.addEventListener('change', () => {
    if (inputMusica.checked) {
        musica.play();
    } else {
        musica.pause();
    }
});

botoes.forEach(botao => {
    botao.addEventListener('click', () => {
        const modo = botao.getAttribute('data-modo');
        alterarModo(modo);
        atualizarSelecao(botao);
    });
});

botaoIniciarPausar.addEventListener('click', iniciarOuPausar);
botaoReiniciar.addEventListener('click', reiniciarTemporizador);

function alterarModo(modo) {
    html.setAttribute('data-modo', modo);
    frase.innerHTML = frases[modo] || '';
    resetarTemporizador(modo, false);
}

function atualizarSelecao(botaoSelecionado) {
    botoes.forEach(botao => botao.classList.remove('selecionado'));
    botaoSelecionado.classList.add('selecionado');
}

function iniciarOuPausar() {
    if (intervaloId) {
        pausarTemporizador();
    } else {
        iniciarTemporizador();
    }
}

function iniciarTemporizador() {
    intervaloId = setInterval(contagemRegressiva, 1000);
    botaoIniciarPausar.innerHTML = '<i class="fas fa-pause icone-botao"></i> Pausar';
    somIniciar.play();
    desabilitarBotoes(true);
    botaoReiniciar.disabled = true;
    botaoReiniciar.classList.add('desabilitado');
}

function pausarTemporizador() {
    clearInterval(intervaloId);
    intervaloId = null;
    botaoIniciarPausar.innerHTML = '<i class="fas fa-play icone-botao"></i> Iniciar';
    somPausar.play();
    desabilitarBotoes(false);
    botaoReiniciar.disabled = false;
    botaoReiniciar.classList.remove('desabilitado');
}

function resetarTemporizador(modo, tocarSom = true) {
    if (intervaloId && tocarSom) {
        pausarTemporizador();
    } else {
        clearInterval(intervaloId);
        intervaloId = null;
    }
    tempoRestante = tempos[modo];
    atualizarDisplayTemporizador();
    botaoReiniciar.disabled = true;
    botaoReiniciar.classList.add('desabilitado');
}

function contagemRegressiva() {
    if (tempoRestante === 0) {
        somTermino.play();
        alert('Tempo Encerrado!');
        const modoAtual = html.getAttribute('data-modo');
        resetarTemporizador(modoAtual, false);
        return;
    }
    tempoRestante--;
    atualizarDisplayTemporizador();
}

function atualizarDisplayTemporizador() {
    displayTemporizador.textContent = formatarTempo(tempoRestante);
}

function formatarTempo(segundos) {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
    return `${String(minutos).padStart(2, '0')}:${String(segundosRestantes).padStart(2, '0')}`;
}

function desabilitarBotoes(desabilitar) {
    botoes.forEach(botao => {
        botao.disabled = desabilitar;
        botao.classList.toggle('desabilitado', desabilitar);
    });
}

function reiniciarTemporizador() {
    const modoAtual = html.getAttribute('data-modo');
    resetarTemporizador(modoAtual, false);
    botaoIniciarPausar.innerHTML = '<i class="fas fa-play icone-botao"></i> Iniciar';
    desabilitarBotoes(false);
}

// Inicializar display do temporizador com o modo padrão (foco)
resetarTemporizador('foco', false);
