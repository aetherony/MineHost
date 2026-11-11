
const AuthController = {
    async registrar(req, res) {
        const { nome, email, senha } = req.body || {};

        if (!nome || !email || !senha) {
            return res.status(400).json({
                sucesso: false,
                mensagem: "Preencha todos os campos."
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

        if (typeof senha !== "string" || senha.length < 8) {
            return res.status(400).json({
                sucesso: false,
                mensagem: "A senha precisa ter pelo menos 8 caracteres."
            });
        }

        return res.status(501).json({
            sucesso: false,
            mensagem: "Cadastro aguardando conexão com banco de dados."
        });
    },

    async login(req, res) {
        const { email, senha } = req.body || {};

        if (!email || !senha) {
            return res.status(400).json({
                sucesso: false,
                mensagem: "Informe e-mail e senha."
            });
        }

        return res.status(501).json({
            sucesso: false,
            mensagem: "Login aguardando implementação segura."
        });
    },

    async sair(req, res) {
        return res.status(501).json({
            sucesso: false,
            mensagem: "Configure sessões seguras no backend."
        });
    }
};

module.exports = AuthController;
            
