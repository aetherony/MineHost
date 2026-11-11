
const { consultar } = require("./database");

const ServerModel = {
    async criar({ userId, nome, versao, tipo }) {
        if (!userId || !nome || !versao || !tipo) {
            throw new Error("Preencha todos os campos.");
        }

        const sql = `
            INSERT INTO servers (user_id, name, version, type, status)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        `;

        const resultado = await consultar(sql, [
            userId,
            nome.trim(),
            versao,
            tipo,
            "offline"
        ]);

        return resultado.rows[0];
    },

    async buscarPorId(id) {
        const resultado = await consultar(
            "SELECT * FROM servers WHERE id = $1",
            [id]
        );

        return resultado.rows[0] || null;
    },

    async listarPorUsuario(userId) {
        const resultado = await consultar(
            `SELECT id, user_id, name, version, type, status, created_at
             FROM servers
             WHERE user_id = $1
             ORDER BY created_at DESC`,
            [userId]
        );

        return resultado.rows;
    },

    async atualizarStatus(id, status) {
        const resultado = await consultar(
            `UPDATE servers
             SET status = $2, updated_at = NOW()
             WHERE id = $1
             RETURNING *`,
            [id, status]
        );

        return resultado.rows[0] || null;
    },

    async excluir(id, userId) {
        const resultado = await consultar(
            `DELETE FROM servers
             WHERE id = $1 AND user_id = $2
             RETURNING id`,
            [id, userId]
        );

        return resultado.rows[0] || null;
    }
};

module.exports = ServerModel;
