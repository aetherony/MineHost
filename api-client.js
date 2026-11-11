
const API = {
    baseURL: "http://localhost:3000/api",

    async requisicao(endpoint, opcoes = {}) {
        try {
            const resposta = await fetch(
                `${this.baseURL}${endpoint}`,
                {
                    ...opcoes,
                    headers: {
                        "Content-Type": "application/json",
                        ...opcoes.headers
                    }
                }
            );

            const dados = await resposta.json().catch(() => ({}));

            if (!resposta.ok) {
                throw new Error(
                    dados.mensagem || "Erro na comunicação com o servidor."
                );
            }

            return {
                sucesso: true,
                dados
            };

        } catch (erro) {
            return {
                sucesso: false,
                mensagem: erro.message
            };
        }
    },

    consultarStatus() {
        return this.requisicao("/status");
    },

    listarServidores() {
        return this.requisicao("/servers");
    },

    criarServidor(configuracao) {
        return this.requisicao("/servers", {
            method: "POST",
            body: JSON.stringify(configuracao)
        });
    },

    buscarServidor(id) {
        return this.requisicao(`/servers/${encodeURIComponent(id)}`);
    }
};

window.API = API;
              
