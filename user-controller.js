
const UserModel = require("./user-model");

const UserController = {
    async listar(req, res) {
        return res.status(403).json({
            sucesso: false,
            mensagem: "Apenas administradores podem listar usuários."
        });
    },

    async buscar(req, res) {
        try {
            const id = Number(req.params.id);

            if (!Number.isInteger(id) || id <= 0) {
                return res.status(400).json({
                    sucesso: false,
                    mensagem: "ID inválido."
                });
            }

            if (String(req.usuario.sub) !== String(id)) {
                return res.status(403).json({
                    sucesso: false,
                    mensagem: "Você não pode acessar esse perfil."
                });
            }

            const usuario = await UserModel.buscarPorId(id);

            if (!usuario) {
                return res.status(404).json({
                    sucesso: false,
                    mensagem: "Usuário não encontrado."
                });
            }

            return res.json({
                sucesso: true,
                usuario
            });
        } catch (erro) {
            console.error("Erro ao buscar usuário:", erro.message);

            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao buscar usuário."
            });
        }
    },

    async atualizar(req, res) {
        try {
            const id = Number(req.params.id);
            const { nome, email } = req.body || {};

            if (!Number.isInteger(id) || id <= 0 || !nome || !email) {
                return res.status(400).json({
                    sucesso: false,
                    mensagem: "Dados inválidos ou incompletos."
                });
            }

            if (String(req.usuario.sub) !== String(id)) {
                return res.status(403).json({
                    sucesso: false,
                    mensagem: "Você não pode alterar esse perfil."
                });
            }

            if (!/^[a-zA-Z0-9_-]{3,20}$/.test(nome)) {
                return res.status(400).json({
                    sucesso: false,
                    mensagem: "Nome de usuário inválido."
                });
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                return res.status(400).json({
                    sucesso: false,
                    mensagem: "E-mail inválido."
                });
            }

            const usuario = await UserModel.atualizar(id, {
                nome,
                email
            });

            if (!usuario) {
                return res.status(404).json({
                    sucesso: false,
                    mensagem: "Usuário não encontrado."
                });
            }

            return res.json({
                sucesso: true,
                mensagem: "Perfil atualizado.",
                usuario
            });
        } catch (erro) {
            console.error("Erro ao atualizar usuário:", erro.message);

            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao atualizar perfil."
            });
        }
    },

    async excluir(req, res) {
        return res.status(403).json({
            sucesso: false,
            mensagem: "A exclusão de contas precisa de confirmação e fluxo próprio."
        });
    }
};

module.exports = UserController;
