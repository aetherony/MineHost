
const UserModel = require("./user-model");
const ServerModel = require("./server-model");

async function listarUsuarios(req, res, next) {
    try {
        const usuarios = await UserModel.listarTodos();

        res.json({
            sucesso: true,
            usuarios
        });
    } catch (erro) {
        next(erro);
    }
}

async function consultarUsuario(req, res, next) {
    try {
        const usuarioId = req.params.id;

        const usuario = await UserModel.buscarPorId(usuarioId);

        if (!usuario) {
            return res.status(404).json({
                sucesso: false,
                mensagem: "Usuário não encontrado."
            });
        }

        res.json({
            sucesso: true,
            usuario
        });
    } catch (erro) {
        next(erro);
    }
}

async function listarServidores(req, res, next) {
    try {
        const servidores = await ServerModel.listarTodos();

        res.json({
            sucesso: true,
            servidores
        });
    } catch (erro) {
        next(erro);
    }
}

async function alterarCargo(req, res, next) {
    try {
        const { cargo } = req.body;
        const usuarioId = req.params.id;

        const cargosPermitidos = [
            "USER",
            "MODERATOR",
            "ADMIN"
        ];

        if (!cargosPermitidos.includes(cargo)) {
            return res.status(400).json({
                sucesso: false,
                mensagem: "Cargo inválido."
            });
        }

        if (cargo === "ADMIN" && req.user.id === usuarioId) {
            return res.status(403).json({
                sucesso: false,
                mensagem: "Não é permitido alterar o próprio cargo."
            });
        }

        const usuario = await UserModel.atualizarCargo(
            usuarioId,
            cargo
        );

        if (!usuario) {
            return res.status(404).json({
                sucesso: false,
                mensagem: "Usuário não encontrado."
            });
        }

        res.json({
            sucesso: true,
            mensagem: "Cargo atualizado."
        });
    } catch (erro) {
        next(erro);
    }
}

module.exports = {
    listarUsuarios,
    consultarUsuario,
    listarServidores,
    alterarCargo
};
  
