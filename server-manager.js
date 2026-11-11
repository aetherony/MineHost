
const ServerManager = {
    servidores: [],

    criar(configuracao) {
        if (!configuracao || !configuracao.nome) {
            return {
                sucesso: false,
                mensagem: "Informe o nome do servidor."
            };
        }

        const servidor = {
            id: crypto.randomUUID(),
            nome: configuracao.nome,
            versao: configuracao.versao || "1.21",
            tipo: configuracao.tipo || "Vanilla",
            status: "offline",
            criadoEm: new Date().toISOString()
        };

        this.servidores.push(servidor);

        return {
            sucesso: true,
            mensagem: "Servidor adicionado à lista de demonstração.",
            servidor
        };
    },

    listar() {
        return this.servidores;
    },

    buscar(id) {
        return this.servidores.find(servidor => servidor.id === id) || null;
    },

    iniciar(id) {
        const servidor = this.buscar(id);

        if (!servidor) {
            return {
                sucesso: false,
                mensagem: "Servidor não encontrado."
            };
        }

        return {
            sucesso: false,
            mensagem: "A inicialização real precisa do backend."
        };
    },

    parar(id) {
        const servidor = this.buscar(id);

        if (!servidor) {
            return {
                sucesso: false,
                mensagem: "Servidor não encontrado."
            };
        }

        return {
            sucesso: false,
            mensagem: "A parada real precisa do backend."
        };
    },

    reiniciar(id) {
        const servidor = this.buscar(id);

        if (!servidor) {
            return {
                sucesso: false,
                mensagem: "Servidor não encontrado."
            };
        }

        return {
            sucesso: false,
            mensagem: "O reinício real precisa do backend."
        };
    },

    excluir(id) {
        const quantidadeAntes = this.servidores.length;

        this.servidores = this.servidores.filter(
            servidor => servidor.id !== id
        );

        return {
            sucesso: this.servidores.length < quantidadeAntes,
            mensagem: "Operação de exclusão concluída na demonstração."
        };
    }
};

window.ServerManager = ServerManager;
      
