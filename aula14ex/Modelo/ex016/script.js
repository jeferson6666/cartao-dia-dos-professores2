function contar() {
    var ini = document.getElementById("txti").value;
    var fim = document.getElementById("txtf").value;
    var passo = document.getElementById("txtp").value;
    let res = document.getElementById("res");

    if (ini.length == 0 || fim.length == 0 || passo.length == 0) {
        res.innerHTML = "Impossível contar!";
        window.alert("[ERRO] Faltam dados!");
     } else {
        res.innerHTML = "Contando: <br>";
        let i = Number(ini);
        let f = Number(fim);
        let p = Number(passo);
        if (p <= 0) {
            window.alert("[ERRO] Passo inválido! Considerando passo 1");
            p = 1; // Define passo como 1 se for inválido
        }
        if (p <= 0) {
            window.alert("[ERRO] Passo inválido!");
         } else {
            res.innerHTML = "Contando: <br>";
            if (i < f) {
                // Contagem crescente
                for (let c = i; c <= f; c += p) {
                    res.innerHTML += ` ${c} \u{1F449}`;
                }
            } else {
                // Contagem regressiva
                for (let c = i; c >= f; c -= p) {
                    res.innerHTML += ` ${c} \u{1F449}`;
                }
            }res.innerHTML += `\u{1F3C1}`;
        }
    }

}