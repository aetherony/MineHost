
const UserController = {
    async listar(req, res) {
        return res.status(501).json({
            sucesso: false,
            mensagem: "Listagem aguardando conexão com banco de dados."
        });
    },

    async buscar(req, res) {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                sucesso: false,
                mensagem: "ID do usuário não informado."
            });
        }

        return res.status(501).json({
            sucesso: false,
            mensagem: "Busca aguardando implementação."
        });
    },

    async atualizar(req, res) {
        const { id } = req.params;
        const { nome, email } = req.body || {};

        if (!id || !nome || !email) {
            return res.status(400).json({
                sucesso: false,
                mensagem: "Dados incompletos."
            });
        }

        return res.status(501).json({
            sucesso: false,
            mensagem: "Atualização aguardando implementação."
        });
    },

    async excluir(req, res) {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                sucesso: false,
                mensagem: "ID não informado."
            });
        }

        return res.status(501).json({
            sucesso: false,
            mensagem: "Exclusão aguardando implementação."
        });
    }
};

module.exports = UserController;
          
