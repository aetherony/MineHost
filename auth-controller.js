
const bcrypt = require("bcrypt");
const UserModel = require("./user-model");
const { gerarToken } = require("./session");

const AuthController = {
    async registrar(req, res) {
        try {
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

            const existente = await UserModel.buscarPorEmail(email);

            if (existente) {
                return res.status(409).json({
                    sucesso: false,
                    mensagem: "Este e-mail já está cadastrado."
                });
            }

            const senhaHash = await bcrypt.hash(senha, 12);

            const usuario = await UserModel.criar({
                nome,
                email,
                senhaHash
            });

            const token = gerarToken(usuario);

            return res.status(201).json({
                sucesso: true,
                mensagem: "Cadastro realizado com sucesso.",
                token,
                usuario
            });

        } catch (erro) {
            console.error("Erro no cadastro:", erro.message);

            return res.status(500).json({
                sucesso: false,
                mensagem: "Não foi possível realizar o cadastro."
            });
        }
    },

    async login(req, res) {
        try {
            const { email, senha } = req.body || {};

            if (!email || !senha) {
                return res.status(400).json({
                    sucesso: false,
                    mensagem: "Informe e-mail e senha."
                });
            }

            const usuario = await UserModel.buscarPorEmail(email);

            if (!usuario) {
                return res.status(401).json({
                    sucesso: false,
                    mensagem: "E-mail ou senha incorretos."
                });
            }

            const senhaCorreta = await bcrypt.compare(
                senha,
                usuario.password_hash
            );

            if (!senhaCorreta) {
                return res.status(401).json({
                    sucesso: false,
                    mensagem: "E-mail ou senha incorretos."
                });
            }

            const token = gerarToken(usuario);

            return res.json({
                sucesso: true,
                mensagem: "Login realizado com sucesso.",
                token,
                usuario: {
                    id: usuario.id,
                    nome: usuario.username,
                    email: usuario.email
                }
            });

        } catch (erro) {
            console.error("Erro no login:", erro.message);

            return res.status(500).json({
                sucesso: false,
                mensagem: "Não foi possível realizar o login."
            });
        }
    },

    async sair(req, res) {
        return res.json({
            sucesso: true,
            mensagem: "Para encerrar a sessão, remova o token armazenado no cliente."
        });
    }
};

module.exports = AuthController;
