
const PERMISSOES = {
    USER: [
        "profile:read",
        "profile:update",
        "server:create",
        "server:read",
        "server:update",
        "server:delete",
        "plugin:read"
    ],

    MODERATOR: [
        "profile:read",
        "server:read",
        "server:update",
        "plugin:read",
        "user:read"
    ],

    ADMIN: [
        "*"
    ]
};

function possuiPermissao(cargo, permissao) {
    if (!cargo || !permissao) {
        return false;
    }

    const permissoesDoCargo = PERMISSOES[cargo];

    if (!permissoesDoCargo) {
        return false;
    }

    return (
        permissoesDoCargo.includes("*") ||
        permissoesDoCargo.includes(permissao)
    );
}

function verificarPermissao(cargo, permissao) {
    return (req, res, next) => {
        if (!possuiPermissao(cargo, permissao)) {
            return res.status(403).json({
                sucesso: false,
                mensagem: "Você não tem permissão para realizar esta ação."
            });
        }

        next();
    };
}

module.exports = {
    PERMISSOES,
    possuiPermissao,
    verificarPermissao
};
      
