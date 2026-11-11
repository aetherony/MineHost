
const crypto = require("crypto");

const TEMPO_EXPIRACAO = 30 * 60 * 1000;

function gerarCodigoVerificacao() {
    return crypto.randomBytes(32).toString("hex");
}

function gerarHashCodigo(codigo) {
    return crypto
        .createHash("sha256")
        .update(codigo)
        .digest("hex");
}

function verificarExpiracao(dataCriacao) {
    const criadoEm = new Date(dataCriacao).getTime();

    if (!Number.isFinite(criadoEm)) {
        return true;
    }

    return Date.now() - criadoEm > TEMPO_EXPIRACAO;
}

module.exports = {
    gerarCodigoVerificacao,
    gerarHashCodigo,
    verificarExpiracao,
    TEMPO_EXPIRACAO
};
