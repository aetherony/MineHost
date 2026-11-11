
const Validation = {
    nome(nome) {
        if (typeof nome !== "string") return false;

        return /^[a-zA-Z0-9_-]{3,20}$/.test(nome.trim());
    },

    email(email) {
        if (typeof email !== "string") return false;

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    },

    senha(senha) {
        return typeof senha === "string" &&
            senha.length >= 8 &&
            senha.length <= 128;
    },

    confirmarSenha(senha, confirmacao) {
        return senha === confirmacao;
    },

    servidor(configuracao) {
        if (!configuracao || typeof configuracao !== "object") {
            return false;
        }

        const nomeValido = this.nome(configuracao.nome);

        const versoes = window.MineHostConfig?.servidor
            ?.versoesPermitidas || [];

        const tipos = window.MineHostConfig?.servidor
            ?.tiposPermitidos || [];

        return (
            nomeValido &&
            versoes.includes(configuracao.versao) &&
            tipos.includes(configuracao.tipo)
        );
    },

    resultado(valido, mensagem) {
        return {
            valido,
            mensagem
        };
    }
};

window.Validation = Validation;
          
