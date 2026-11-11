
const jwt = require("jsonwebtoken");

const TEMPO_EXPIRACAO = "2h";

function gerarToken(usuario) {
    if (!usuario || !usuario.id) {
        throw new Error("Usuário inválido.");
    }

    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET não configurado.");
    }

    return jwt.sign(
        {
            sub: String(usuario.id),
            email: usuario.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: TEMPO_EXPIRACAO,
            issuer: "minehost"
        }
    );
}

function verificarToken(token) {
    if (!token || !process.env.JWT_SECRET) {
        return null;
    }

    try {
        return jwt.verify(token, process.env.JWT_SECRET, {
            issuer: "minehost"
        });
    } catch (erro) {
        return null;
    }
}

module.exports = {
    gerarToken,
    verificarToken
};
 
