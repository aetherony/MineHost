
const VERSAO_MAXIMA = "1.50.5";

const VERSOES_CONHECIDAS = [
    "1.8.8",
    "1.12.2",
    "1.16.5",
    "1.17.1",
    "1.18.2",
    "1.19.4",
    "1.20.1",
    "1.20.4",
    "1.21",
    "1.21.1",
    "1.21.4"
];

function compararVersoes(a, b) {
    const partesA = a.split(".").map(Number);
    const partesB = b.split(".").map(Number);

    for (let i = 0; i < 3; i++) {
        const diferenca = (partesA[i] || 0) - (partesB[i] || 0);

        if (diferenca !== 0) {
            return diferenca;
        }
    }

    return 0;
}

function validarVersao(versao) {
    if (typeof versao !== "string") {
        return false;
    }

    if (!/^\d+\.\d+(\.\d+)?$/.test(versao)) {
        return false;
    }

    return compararVersoes(versao, VERSAO_MAXIMA) <= 0;
}

function listarVersoes() {
    return [...VERSOES_CONHECIDAS]
        .filter(validarVersao)
        .sort(compararVersoes);
}

function adicionarVersao(versao) {
    if (!validarVersao(versao)) {
        throw new Error("Versão inválida ou acima do limite.");
    }

    if (!VERSOES_CONHECIDAS.includes(versao)) {
        VERSOES_CONHECIDAS.push(versao);
    }

    return listarVersoes();
}

module.exports = {
    VERSAO_MAXIMA,
    listarVersoes,
    validarVersao,
    adicionarVersao
};
      
