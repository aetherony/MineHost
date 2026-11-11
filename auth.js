
const Auth = {
    validarEmail(email) {
        const formato = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return formato.test(email);
    },

    validarSenha(senha) {
        return typeof senha === "string" && senha.length >= 8;
    },

    validarCadastro(nome, email, senha, confirmacao) {
        if (!nome || !email || !senha || !confirmacao) {
            return {
                sucesso: false,
                mensagem: "Preencha todos os campos."
            };
        }

        if (!this.validarEmail(email)) {
            return {
                sucesso: false,
                mensagem: "Digite um email válido."
            };
        }

        if (!this.validarSenha(senha)) {
            return {
                sucesso: false,
                mensagem: "A senha precisa ter pelo menos 8 caracteres."
            };
        }

        if (senha !== confirmacao) {
            return {
                sucesso: false,
                mensagem: "As senhas não são iguais."
            };
        }

        return {
            sucesso: true,
            mensagem: "Dados validados com sucesso."
        };
    },

    sair() {
        window.location.href = "login.html";
    }
};

window.Auth = Auth;
          
