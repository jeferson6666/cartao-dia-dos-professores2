const tabuleiro = document.getElementById('tabuleiro');
const mensagem = document.getElementById('mensagem');
let jogo = [];
let vez = 'vermelha';
let selecionada = null;

function criarTabuleiro() {
    tabuleiro.innerHTML = '';
    jogo = [];
    for (let l = 0; l < 8; l++) {
        let linha = [];
        for (let c = 0; c < 8; c++) {
            let casa = document.createElement('div');
            casa.className = 'casa ' + ((l + c) % 2 === 0 ? 'branca' : 'preta');
            casa.dataset.linha = l;
            casa.dataset.coluna = c;
            casa.onclick = () => clicarCasa(l, c);
            tabuleiro.appendChild(casa);
            linha.push({ peca: null, casa });
        }
        jogo.push(linha);
    }
    // Coloca as peças
    for (let l = 0; l < 3; l++) {
        for (let c = 0; c < 8; c++) {
            if ((l + c) % 2 !== 0) colocarPeca(l, c, 'preta');
        }
    }
    for (let l = 5; l < 8; l++) {
        for (let c = 0; c < 8; c++) {
            if ((l + c) % 2 !== 0) colocarPeca(l, c, 'vermelha');
        }
    }
    vez = 'vermelha';
    selecionada = null;
    mensagem.textContent = 'Vez da peça vermelha';
}

function colocarPeca(l, c, cor, dama = false) {
    const peca = document.createElement('div');
    peca.className = 'peca ' + cor + (dama ? ' dama' : '');
    peca.textContent = dama ? '👑' : '';
    jogo[l][c].peca = { cor, dama };
    jogo[l][c].casa.appendChild(peca);
}

function removerPeca(l, c) {
    jogo[l][c].peca = null;
    jogo[l][c].casa.innerHTML = '';
}

function clicarCasa(l, c) {
    if (jogo[l][c].peca && jogo[l][c].peca.cor === vez) {
        desmarcarSelecao();
        selecionada = { l, c };
        jogo[l][c].casa.classList.add('selecionada');
    } else if (selecionada) {
        if (podeMover(selecionada.l, selecionada.c, l, c)) {
            moverPeca(selecionada.l, selecionada.c, l, c);
            vez = vez === 'vermelha' ? 'preta' : 'vermelha';
            mensagem.textContent = 'Vez da peça ' + vez;
        } else {
            mensagem.textContent = 'Movimento inválido!';
        }
        desmarcarSelecao();
        selecionada = null;
    }
}

function desmarcarSelecao() {
    document.querySelectorAll('.casa.selecionada').forEach(c => c.classList.remove('selecionada'));
}

function podeMover(l1, c1, l2, c2) {
    const peca = jogo[l1][c1].peca;
    if (!peca || jogo[l2][c2].peca || (l1 + c1) % 2 === 0 || (l2 + c2) % 2 === 0) return false;
    const dir = peca.cor === 'vermelha' ? -1 : 1;
    // Movimento simples
    if (!peca.dama && l2 === l1 + dir && Math.abs(c2 - c1) === 1) return true;
    // Captura
    if (!peca.dama && l2 === l1 + dir * 2 && Math.abs(c2 - c1) === 2) {
        const lCap = l1 + dir;
        const cCap = c1 + (c2 - c1) / 2;
        if (jogo[lCap][cCap].peca && jogo[lCap][cCap].peca.cor !== peca.cor) return true;
    }
    // Dama movimento simples
    if (peca.dama && Math.abs(l2 - l1) === 1 && Math.abs(c2 - c1) === 1) return true;
    // Dama captura
    if (peca.dama && Math.abs(l2 - l1) === 2 && Math.abs(c2 - c1) === 2) {
        const lCap = l1 + (l2 - l1) / 2;
        const cCap = c1 + (c2 - c1) / 2;
        if (jogo[lCap][cCap].peca && jogo[lCap][cCap].peca.cor !== peca.cor) return true;
    }
    return false;
}

function moverPeca(l1, c1, l2, c2) {
    const peca = jogo[l1][c1].peca;
    removerPeca(l1, c1);
    // Captura
    if (Math.abs(l2 - l1) === 2 && Math.abs(c2 - c1) === 2) {
        const lCap = l1 + (l2 - l1) / 2;
        const cCap = c1 + (c2 - c1) / 2;
        removerPeca(lCap, cCap);
    }
    // Virar dama
    let virouDama = false;
    if (!peca.dama && ((peca.cor === 'vermelha' && l2 === 0) || (peca.cor === 'preta' && l2 === 7))) {
        colocarPeca(l2, c2, peca.cor, true);
        virouDama = true;
    } else {
        colocarPeca(l2, c2, peca.cor, peca.dama);
    }
    if (virouDama) mensagem.textContent = 'Parabéns! Uma peça virou Dama 👑';
}

function reiniciarJogo() {
    criarTabuleiro();
}

criarTabuleiro();
