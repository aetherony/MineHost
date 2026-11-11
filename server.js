
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const routes = require("./routes");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5500"
}));

app.use(express.json({ limit: "20kb" }));

app.get("/", (req, res) => {
    res.json({
        nome: "MineHost",
        mensagem: "API MineHost em desenvolvimento",
        versao: "1.0.0"
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
    console.error(erro.message);

    res.status(500).json({
        sucesso: false,
        mensagem: "Erro interno do servidor."
    });
});

app.listen(PORT, () => {
    console.log(`MineHost API iniciada na porta ${PORT}`);
});
      
