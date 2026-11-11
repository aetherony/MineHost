
function errorHandler(erro, req, res, next) {
    console.error("Erro no MineHost:", erro.message);

    if (res.headersSent) {
        return next(erro);
    }

    const status = Number.isInteger(erro.status)
        ? erro.status
        : 500;

    res.status(status).json({
        sucesso: false,
        mensagem: status >= 500
            ? "Erro interno do servidor."
            : erro.message
    });
}

module.exports = errorHandler;
