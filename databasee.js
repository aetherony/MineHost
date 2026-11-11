
const { Pool } = require("pg");
const config = require("./database-config");

const pool = new Pool({
    ...config,
    max: config.pool.max,
    idleTimeoutMillis: config.pool.idleTimeoutMillis
});

pool.on("error", (erro) => {
    console.error("Erro inesperado no banco:", erro.message);
});

async function conectarBanco() {
    try {
        const resultado = await pool.query("SELECT NOW()");

        console.log("MineHost conectado ao PostgreSQL!");

        return {
            sucesso: true,
            horario: resultado.rows[0].now
        };
    } catch (erro) {
        console.error("Falha na conexão:", erro.message);

        return {
            sucesso: false,
            mensagem: "Não foi possível conectar ao banco."
        };
    }
}

async function consultar(sql, parametros = []) {
    return pool.query(sql, parametros);
}

async function fecharBanco() {
    await pool.end();
}

module.exports = {
    pool,
    conectarBanco,
    consultar,
    fecharBanco
};
