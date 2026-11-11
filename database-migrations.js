
const fs = require("fs");
const path = require("path");
const { pool } = require("./database");

const caminhoSchema = path.join(__dirname, "database-schema.sql");

async function executarMigracoes() {
    const cliente = await pool.connect();

    try {
        const schema = fs.readFileSync(caminhoSchema, "utf8");

        await cliente.query("BEGIN");
        await cliente.query(schema);
        await cliente.query("COMMIT");

        console.log("Migrações do MineHost executadas com sucesso!");

        return {
            sucesso: true,
            mensagem: "Banco de dados atualizado."
        };
    } catch (erro) {
        await cliente.query("ROLLBACK");

        console.error("Erro nas migrações:", erro.message);

        throw erro;
    } finally {
        cliente.release();
    }
}

module.exports = { executarMigracoes };
      
