
const ServerController = {
    async listar(req, res) {
        return res.status(501).json({
            sucesso: false,
            mensagem: "Listagem aguardando conexão com banco de dados."
        });
    },

    async criar(req, res) {
        const { nome, versao, tipo } = req.body || {};

        if (!nome || !versao || !tipo) {
            return res.status(400).json({
                sucesso: false,
                mensagem: "Preencha todos os campos."
            });
        }

        return res.status(501).json({
            sucesso: false,
            mensagem: "Criação aguardando integração com o sistema de hospedagem."
        });
    },

    async buscar(req, res) {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                sucesso: false,
                mensagem: "ID do servidor não informado."
            });
        }

        return res.status(501).json({
            sucesso: false,
            mensagem: "Busca ainda não implementada."
        });
    },

    async iniciar(req, res) {
        return res.status(501).json({
            sucesso: false,
            mensagem: "Inicialização real ainda não implementada."
        });
    },

    async parar(req, res) {
        return res.status(501).json({
            sucesso: false,
            mensagem: "Parada real ainda não implementada."
        });
    },

    async excluir(req, res) {
        return res.status(501).json({
            sucesso: false,
            mensagem: "Exclusão ainda não implementada."
        });
    }
};

module.exports = ServerController;
      
