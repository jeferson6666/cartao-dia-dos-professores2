
const poema = [
    '🍎 Ser professor é semear sonhos,',
    '✨ É acender estrelas no olhar.',
    '💖 É guiar com carinho e esperança,',
    '🌱 E nunca deixar de acreditar.',
    '',
    '🌉 É construir pontes de afeto,',
    '🌍 É transformar o mundo com saber.',
    '🌻 É plantar no coração de cada aluno,',
    '🚀 A vontade de crescer e aprender.',
    '',
    '🔆 Professor, tua missão é luz,',
    '🌟 Teu exemplo é inspiração.',
    '🎉 Hoje celebramos tua jornada,',
    'Com amor, respeito e gratidão! ❤️',
    '',
    '🙏 Obrigado por ensinar com tanto carinho e dedicação,',
    'por cuidar e inspirar todos os meus filhos,',
    'por fazer parte da história de cada um deles.',
    'Você é inesquecível para nossa família! 👨‍👩‍👧‍👦'
];


function animarPoema() {
    const div = document.getElementById('poema');
    div.innerHTML = '';
    let i = 0;
    function mostrarLinha() {
        if (i < poema.length) {
            const linha = document.createElement('div');
            // Se a linha começa com emoji, destaque
            if (/^[\uD800-\uDBFF][\uDC00-\uDFFF]|[\u2600-\u27BF]/.test(poema[i])) {
                linha.classList.add('emoji');
            }
            linha.textContent = poema[i];
            linha.style.opacity = 0;
            linha.style.transform = 'translateX(-30px)';
            div.appendChild(linha);
            setTimeout(() => {
                linha.style.transition = 'all 0.7s cubic-bezier(.68,-0.55,.27,1.55)';
                linha.style.opacity = 1;
                linha.style.transform = 'translateX(0)';
            }, 50);
            i++;
            setTimeout(mostrarLinha, 700);
        } else {
            confeteAnimado();
            brilhoExtra();
        }
    }
    mostrarLinha();
}

function brilhoExtra() {
    for (let i = 0; i < 8; i++) {
        const brilho = document.createElement('div');
        brilho.className = 'brilho';
        brilho.style.left = Math.random() * 90 + '%';
        brilho.style.top = (30 + Math.random() * 40) + '%';
        brilho.style.animationDuration = (2 + Math.random() * 2) + 's';
        document.querySelector('.cartao').appendChild(brilho);
        setTimeout(() => brilho.remove(), 3000);
    }
}

function confeteAnimado() {
    for (let i = 0; i < 40; i++) {
        const confete = document.createElement('div');
        confete.className = 'confete';
        confete.style.position = 'fixed';
        confete.style.left = Math.random() * 100 + 'vw';
        confete.style.top = '-30px';
        confete.style.width = '12px';
        confete.style.height = '12px';
        confete.style.background = `hsl(${Math.random()*360},90%,60%)`;
        confete.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confete.style.zIndex = 9999;
        confete.style.opacity = 0.85;
        confete.style.transition = 'top 2.5s linear, opacity 0.7s';
        document.body.appendChild(confete);
        setTimeout(() => {
            confete.style.top = (60 + Math.random()*30) + 'vh';
            confete.style.opacity = 0;
        }, 50);
        setTimeout(() => {
            confete.remove();
        }, 2700);
    }
}
