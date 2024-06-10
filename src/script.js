const html = document.querySelector('html');
const botaoFoco = document.querySelector('.botao-foco');
const botaoDescansoCurto = document.querySelector('.botao-descanso-curto');
const botaoDescansoLongo = document.querySelector('.botao-descanso-longo');
const frase = document.querySelector('.frase');
const botoes = document.querySelectorAll('.botao');
const inputMusica = document.querySelector('#alternancia-musica');

const musica = new Audio('sons/lofi-study.mp3');
musica.loop = true;

inputMusica.addEventListener('change', () => {
    if (inputMusica.checked) {
        musica.play();
    } else {
        musica.pause();
    }
});

botaoFoco.addEventListener('click', () => {
    alterarModo('foco');
    botaoFoco.classList.add('selecionado');
});

botaoDescansoCurto.addEventListener('click', () => {
    alterarModo('descanso-curto');
    botaoDescansoCurto.classList.add('selecionado');
});

botaoDescansoLongo.addEventListener('click', () => {
    alterarModo('descanso-longo');
    botaoDescansoLongo.classList.add('selecionado');
});

function alterarModo(modo) {
    botoes.forEach(botao => botao.classList.remove('selecionado'));
    html.setAttribute('data-modo', modo);

    switch (modo) {
        case 'foco':
            frase.innerHTML = `
                Aprimore sua eficiência,<br> <strong>concentre-se no essencial</strong>.
            `;
            break;
        case 'descanso-curto':
            frase.innerHTML = `
                Aproveite um breve descanso,<br> para <strong>recarregar suas energias</strong>.
            `;
            break;
        case 'descanso-longo':
            frase.innerHTML = `
                Faça uma pausa prolongada,<br> e volte com <strong>ainda mais foco</strong>.
            `;
            break;
        default:
            break;
    }
}
