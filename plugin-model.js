
const { consultar } = require("./database");

const PluginModel = {
    async criar({ nome, descricao, versao, tipo, url }) {
        if (!nome || !versao || !tipo) {
            throw new Error("Preencha os campos obrigatórios.");
        }

        const sql = `
            INSERT INTO plugins (
                name,
                description,
                version,
                type,
                download_url
            )
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        `;

        const resultado = await consultar(sql, [
            nome.trim(),
            descricao || "",
            versao,
            tipo,
            url || null
        ]);

        return resultado.rows[0];
    },

    async buscarPorId(id) {
        const resultado = await consultar(
            "SELECT * FROM plugins WHERE id = $1",
            [id]
        );

        return resultado.rows[0] || null;
    },

    async listar() {
        const resultado = await consultar(
            `SELECT * FROM plugins
             ORDER BY created_at DESC`
        );

        return resultado.rows;
    },

    async buscarPorTipo(tipo) {
        const resultado = await consultar(
            `SELECT * FROM plugins
             WHERE type = $1
             ORDER BY name ASC`,
            [tipo]
        );

        return resultado.rows;
    },

    async excluir(id) {
        const resultado = await consultar(
            `DELETE FROM plugins
             WHERE id = $1
             RETURNING id`,
            [id]
        );

        return resultado.rows[0] || null;
    }
};

module.exports = PluginModel;
  
