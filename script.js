const html = document.querySelector('html');
const frase = document.querySelector('.frase');
const botoes = document.querySelectorAll('.botao');
const botaoIniciarPausar = document.querySelector('#iniciar-pausar');
const botaoReiniciar = document.querySelector('#reiniciar');
const inputMusica = document.querySelector('#alternancia-musica');
const displayTemporizador = document.querySelector('#temporizador');
const iconeInformativo = document.querySelector('#info-icon');
const modal = document.querySelector('#modal-explicacao');
const fecharModal = document.querySelector('#fechar-modal');
const rotuloMusica = document.querySelector('.rotulo-alternancia');
const botaoShuffle = document.querySelector('#botao-shuffle');

const somIniciar = new Audio('sons/start.wav');
const somPausar = new Audio('sons/pause.wav');
const somTermino = new Audio('sons/finish.mp3');

const musicas = [
    'sons/music1.mp3',
    'sons/music2.mp3',
    'sons/music3.mp3',
    'sons/music4.mp3',
    'sons/music5.mp3',
    'sons/music6.mp3'
];

let intervaloId = null;
let tempoRestante;
let musicaAtual = 0;
let musicasTocadas = [];

const musica = new Audio(musicas[musicaAtual]);
musica.loop = true;

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

iconeInformativo.addEventListener('click', () => {
    modal.style.display = 'flex';
});

fecharModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

botaoShuffle.addEventListener('click', () => {
    trocarMusicaAleatoria();
});

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
    inputMusica.disabled = false;
    rotuloMusica.classList.remove('desabilitado');
    inputMusica.classList.remove('desabilitado');
    botaoShuffle.disabled = false;
    botaoShuffle.classList.remove('desabilitado');
}

function pausarTemporizador() {
    clearInterval(intervaloId);
    intervaloId = null;
    botaoIniciarPausar.innerHTML = '<i class="fas fa-play icone-botao"></i> Iniciar';
    somPausar.play();
    desabilitarBotoes(false);
    botaoReiniciar.disabled = false;
    botaoReiniciar.classList.remove('desabilitado');

    if (!musica.paused) {
        musica.pause();
        inputMusica.checked = false;
    }

    inputMusica.disabled = true;
    rotuloMusica.classList.add('desabilitado');
    inputMusica.classList.add('desabilitado');
    botaoShuffle.disabled = true;
    botaoShuffle.classList.add('desabilitado');
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
    inputMusica.disabled = true;
    rotuloMusica.classList.add('desabilitado');
    inputMusica.classList.add('desabilitado');
    botaoShuffle.disabled = true;
    botaoShuffle.classList.add('desabilitado');
}

function contagemRegressiva() {
    if (tempoRestante === 0) {
        somTermino.play();
        const modoAtual = html.getAttribute('data-modo');
        resetarTemporizador(modoAtual, false);
        botaoIniciarPausar.innerHTML = '<i class="fas fa-play icone-botao"></i> Iniciar';
        desabilitarBotoes(false);
        if (!musica.paused) {
            musica.pause();
            inputMusica.checked = false;
        }
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

function trocarMusicaAleatoria() {
    let musicasRestantes = musicas.filter((musica, index) => index !== musicaAtual);

    if (musicasTocadas.length === musicas.length - 1) {
        musicasTocadas = [];
    }

    const indiceAleatorio = Math.floor(Math.random() * musicasRestantes.length);
    const novaMusica = musicasRestantes[indiceAleatorio];
    musicaAtual = musicas.indexOf(novaMusica);

    musicasTocadas.push(novaMusica);
    musica.src = novaMusica;

    if (inputMusica.checked) {
        musica.play();
    }
}

// Inicializar display do temporizador com o modo padrão (foco)
resetarTemporizador('foco', false);
