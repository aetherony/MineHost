
const Database = {
    conectado: false,

    async conectar() {
        console.log("MineHost: banco de dados ainda não conectado.");
        this.conectado = false;

        return {
            sucesso: false,
            mensagem: "Configure um backend para conectar o banco de dados."
        };
    },

    async buscarUsuario(id) {
        return {
            sucesso: false,
            mensagem: "Busca disponível após configurar o backend."
        };
    },

    async criarUsuario(dados) {
        if (!dados || !dados.nome || !dados.email) {
            return {
                sucesso: false,
                mensagem: "Dados do usuário incompletos."
            };
        }

        return {
            sucesso: false,
            mensagem: "Cadastro ainda depende do backend."
        };
    },

    async listarServidores() {
        return [];
    },

    async salvarServidor(servidor) {
        if (!servidor || !servidor.nome) {
            return {
                sucesso: false,
                mensagem: "Nome do servidor obrigatório."
            };
        }

        return {
            sucesso: false,
            mensagem: "Salvamento ainda depende do backend."
        };
    }
};

window.Database = Database;
              
