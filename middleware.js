
const Middleware = {
    verificarRequisicao(req, res, next) {
        if (!req.body || typeof req.body !== "object") {
            return res.status(400).json({
                sucesso: false,
                mensagem: "Requisição inválida."
            });
        }

        next();
    },

    verificarOrigem(req, res, next) {
        const origem = req.get("origin");
        const permitida = process.env.FRONTEND_URL;

        if (origem && permitida && origem !== permitida) {
            return res.status(403).json({
                sucesso: false,
                mensagem: "Origem não autorizada."
            });
        }

        next();
    }
};

module.exports = Middleware;
