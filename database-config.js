
require("dotenv").config();

const { Pool } = require("pg");
const DatabaseConfig = require("./database-config");

const pool = new Pool({
    ...DatabaseConfig
});

async function consultar(sql, parametros = []) {
    return pool.query(sql, parametros);
}

async function conectar() {
    const client = await pool.connect();

    try {
        await client.query("SELECT 1");
        console.log("MineHost: PostgreSQL conectado.");
        return true;
    } finally {
        client.release();
    }
}

async function encerrar() {
    await pool.end();
}

module.exports = {
    pool,
    consultar,
    conectar,
    encerrar
};
