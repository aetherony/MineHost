
const { verificarToken } = require("./session");

function verificarAutenticacao(req, res, next) {
    const cabecalho = req.headers.authorization;

    if (!cabecalho || !cabecalho.startsWith("Bearer ")) {
        return res.status(401).json({
            sucesso: false,
            mensagem: "Autenticação necessária."
        });
    }

    const token = cabecalho.substring(7);
    const usuario = verificarToken(token);

    if (!usuario) {
        return res.status(401).json({
            sucesso: false,
            mensagem: "Token inválido ou expirado."
        });
    }

    req.usuario = usuario;
    next();
}

module.exports = verificarAutenticacao;
