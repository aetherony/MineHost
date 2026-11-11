
function exigirAdministrador(req, res, next) {
    if (!req.user || !req.user.id) {
        return res.status(401).json({
            sucesso: false,
            mensagem: "Você precisa estar autenticado."
        });
    }

    if (req.user.role !== "ADMIN") {
        return res.status(403).json({
            sucesso: false,
            mensagem: "Acesso permitido apenas para administradores."
        });
    }

    next();
}

function exigirModeradorOuAdministrador(req, res, next) {
    if (!req.user || !req.user.id) {
        return res.status(401).json({
            sucesso: false,
            mensagem: "Você precisa estar autenticado."
        });
    }

    const cargosPermitidos = ["MODERATOR", "ADMIN"];

    if (!cargosPermitidos.includes(req.user.role)) {
        return res.status(403).json({
            sucesso: false,
            mensagem: "Você não tem permissão para acessar esta área."
        });
    }

    next();
}

module.exports = {
    exigirAdministrador,
    exigirModeradorOuAdministrador
};
        
