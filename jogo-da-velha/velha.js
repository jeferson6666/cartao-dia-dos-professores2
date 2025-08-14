const tabuleiro = document.getElementById('tabuleiro');
const mensagem = document.getElementById('mensagem');
let jogo = [];
let vez = 'X';
let fim = false;

function criarTabuleiro() {
    tabuleiro.innerHTML = '';
    jogo = [];
    fim = false;
    for (let l = 0; l < 3; l++) {
        let linha = [];
        for (let c = 0; c < 3; c++) {
            let casa = document.createElement('div');
            casa.className = 'casa';
            casa.dataset.linha = l;
            casa.dataset.coluna = c;
            casa.onclick = () => clicarCasa(l, c);
            tabuleiro.appendChild(casa);
            linha.push('');
        }
        jogo.push(linha);
    }
    vez = 'X';
    mensagem.textContent = 'Vez do jogador X';
}

function clicarCasa(l, c) {
    if (fim || jogo[l][c] !== '') return;
    jogo[l][c] = vez;
    const casas = document.querySelectorAll('.casa');
    casas[l * 3 + c].textContent = vez;
    if (verificarVitoria(vez)) {
        mensagem.textContent = `Jogador ${vez} venceu!`;
        destacarVencedor(vez);
        fim = true;
    } else if (jogo.flat().every(v => v !== '')) {
        mensagem.textContent = 'Empate!';
        fim = true;
    } else {
        vez = vez === 'X' ? 'O' : 'X';
        mensagem.textContent = `Vez do jogador ${vez}`;
    }
}

function verificarVitoria(jogador) {
    // Linhas e colunas
    for (let i = 0; i < 3; i++) {
        if (jogo[i][0] === jogador && jogo[i][1] === jogador && jogo[i][2] === jogador) return true;
        if (jogo[0][i] === jogador && jogo[1][i] === jogador && jogo[2][i] === jogador) return true;
    }
    // Diagonais
    if (jogo[0][0] === jogador && jogo[1][1] === jogador && jogo[2][2] === jogador) return true;
    if (jogo[0][2] === jogador && jogo[1][1] === jogador && jogo[2][0] === jogador) return true;
    return false;
}

function destacarVencedor(jogador) {
    const casas = document.querySelectorAll('.casa');
    // Linhas
    for (let i = 0; i < 3; i++) {
        if (jogo[i][0] === jogador && jogo[i][1] === jogador && jogo[i][2] === jogador) {
            for (let c = 0; c < 3; c++) casas[i * 3 + c].classList.add('vencedora');
        }
    }
    // Colunas
    for (let i = 0; i < 3; i++) {
        if (jogo[0][i] === jogador && jogo[1][i] === jogador && jogo[2][i] === jogador) {
            for (let l = 0; l < 3; l++) casas[l * 3 + i].classList.add('vencedora');
        }
    }
    // Diagonais
    if (jogo[0][0] === jogador && jogo[1][1] === jogador && jogo[2][2] === jogador) {
        for (let i = 0; i < 3; i++) casas[i * 3 + i].classList.add('vencedora');
    }
    if (jogo[0][2] === jogador && jogo[1][1] === jogador && jogo[2][0] === jogador) {
        casas[0 * 3 + 2].classList.add('vencedora');
        casas[1 * 3 + 1].classList.add('vencedora');
        casas[2 * 3 + 0].classList.add('vencedora');
    }
}

function reiniciarJogo() {
    criarTabuleiro();
}

criarTabuleiro();
