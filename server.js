
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const routes = require("./routes");
const Database = require("./database");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());

app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5500"
}));

app.use(express.json({ limit: "20kb" }));

app.get("/", (req, res) => {
    res.json({
        sucesso: true,
        projeto: "MineHost",
        mensagem: "API MineHost está funcionando."
    });
});

app.get("/api/status", (req, res) => {
    res.json({
        sucesso: true,
        status: "online",
        projeto: "MineHost"
    });
});

app.use("/api", routes);

app.use((req, res) => {
    res.status(404).json({
        sucesso: false,
        mensagem: "Rota não encontrada."
    });
});

app.use((erro, req, res, next) => {
    console.error("Erro na API:", erro.message);

    res.status(500).json({
        sucesso: false,
        mensagem: "Erro interno no servidor."
    });
});

async function iniciarServidor() {
    try {
        await Database.conectar();

        const servidor = app.listen(PORT, () => {
            console.log(`MineHost API rodando na porta ${PORT}`);
        });

        async function encerrarServidor() {
            console.log("Encerrando MineHost...");

            servidor.close(async () => {
                try {
                    await Database.encerrar();
                    process.exit(0);
                } catch (erro) {
                    console.error("Erro ao encerrar banco:", erro.message);
                    process.exit(1);
                }
            });
        }

        process.on("SIGINT", encerrarServidor);
        process.on("SIGTERM", encerrarServidor);

    } catch (erro) {
        console.error("Não foi possível iniciar o MineHost:", erro.message);
        process.exit(1);
    }
}

iniciarServidor();
