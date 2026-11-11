
const jwt = require("jsonwebtoken");

function verificarAutenticacao(req, res, next) {
    const cabecalho = req.headers.authorization;

    if (!cabecalho || !cabecalho.startsWith("Bearer ")) {
        return res.status(401).json({
            sucesso: false,
            mensagem: "Autenticação necessária."
        });
    }

    const token = cabecalho.substring(7);

    try {
        const usuario = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.usuario = usuario;
        next();

    } catch (erro) {
        return res.status(401).json({
            sucesso: false,
            mensagem: "Token inválido ou expirado."
        });
    }
}

module.exports = verificarAutenticacao;
