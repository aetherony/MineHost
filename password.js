
const bcrypt = require("bcrypt");

const ROUNDS = 12;

async function gerarHash(senha) {
    if (typeof senha !== "string" || senha.length < 8) {
        throw new Error("A senha deve ter pelo menos 8 caracteres.");
    }

    return bcrypt.hash(senha, ROUNDS);
}

async function verificarSenha(senha, hash) {
    if (
        typeof senha !== "string" ||
        typeof hash !== "string"
    ) {
        return false;
    }

    return bcrypt.compare(senha, hash);
}

module.exports = {
    gerarHash,
    verificarSenha
};
