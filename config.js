
const MineHostConfig = {
    nome: "MineHost",
    versao: "1.0.0",
    ambiente: "development",

    site: {
        idioma: "pt-BR",
        tema: "dark",
        url: window.location.origin
    },

    servidor: {
        versoesPermitidas: [
            "1.20",
            "1.20.1",
            "1.20.2",
            "1.20.4",
            "1.20.6",
            "1.21",
            "1.21.1",
            "1.21.4"
        ],

        tiposPermitidos: [
            "Vanilla",
            "Paper",
            "Spigot"
        ],

        status: [
            "offline",
            "starting",
            "online",
            "stopping",
            "error"
        ]
    },

    limites: {
        nomeMinimo: 3,
        nomeMaximo: 20,
        senhaMinima: 8
    },

    recursos: {
        cadastro: true,
        plugins: true,
        notificacoes: true,
        pagamentos: false,
        servidoresReais: false
    }
};

window.MineHostConfig = MineHostConfig;
