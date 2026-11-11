
const crypto = require("crypto");

const TEMPO_EXPIRACAO = 30 * 60 * 1000;

function gerarTokenRedefinicao() {
    return crypto.randomBytes(32).toString("hex");
}

function gerarHashToken(token) {
    return crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");
}

function verificarValidade(dataCriacao) {
    const criadoEm = new Date(dataCriacao).getTime();

    if (!Number.isFinite(criadoEm)) {
        return false;
    }

    return Date.now() - criadoEm <= TEMPO_EXPIRACAO;
}

module.exports = {
    gerarTokenRedefinicao,
    gerarHashToken,
    verificarValidade,
    TEMPO_EXPIRACAO
};
