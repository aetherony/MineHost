
const rateLimit = require("express-rate-limit");

const limiteGeral = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: "draft-7",
    legacyHeaders: false,

    message: {
        sucesso: false,
        mensagem: "Muitas requisições. Tente novamente mais tarde."
    }
});

const limiteLogin = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: "draft-7",
    legacyHeaders: false,

    message: {
        sucesso: false,
        mensagem: "Muitas tentativas de login. Aguarde antes de tentar novamente."
    }
});

module.exports = {
    limiteGeral,
    limiteLogin
};
