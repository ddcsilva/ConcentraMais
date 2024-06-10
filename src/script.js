const html = document.querySelector('html');
const frase = document.querySelector('.frase');
const botoes = document.querySelectorAll('.botao');
const inputMusica = document.querySelector('#alternancia-musica');

const musica = new Audio('sons/lofi-study.mp3');
musica.loop = true;

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

function alterarModo(modo) {
    html.setAttribute('data-modo', modo);
    frase.innerHTML = frases[modo] || '';
}

function atualizarSelecao(botaoSelecionado) {
    botoes.forEach(botao => botao.classList.remove('selecionado'));
    botaoSelecionado.classList.add('selecionado');
}
