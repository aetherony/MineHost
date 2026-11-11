
const Notifications = {
    items: [],

    adicionar(titulo, mensagem, tipo = "info") {
        const notificacao = {
            id: crypto.randomUUID(),
            titulo,
            mensagem,
            tipo,
            lida: false,
            data: new Date().toISOString()
        };

        this.items.unshift(notificacao);

        return notificacao;
    },

    listar() {
        return this.items;
    },

    contarNaoLidas() {
        return this.items.filter(item => !item.lida).length;
    },

    marcarComoLida(id) {
        const item = this.items.find(item => item.id === id);

        if (!item) return false;

        item.lida = true;
        return true;
    },

    marcarTodasComoLidas() {
        this.items.forEach(item => {
            item.lida = true;
        });
    },

    excluir(id) {
        const quantidadeAntes = this.items.length;

        this.items = this.items.filter(item => item.id !== id);

        return this.items.length < quantidadeAntes;
    },

    limpar() {
        this.items = [];
    }
};

window.Notifications = Notifications;
