
const { consultar } = require("./database");

const NotificationModel = {
    async criar({ userId, titulo, mensagem, tipo = "info" }) {
        if (!userId || !titulo || !mensagem) {
            throw new Error("Preencha todos os campos obrigatórios.");
        }

        const sql = `
            INSERT INTO notifications (
                user_id,
                title,
                message,
                type,
                is_read
            )
            VALUES ($1, $2, $3, $4, FALSE)
            RETURNING *
        `;

        const resultado = await consultar(sql, [
            userId,
            titulo.trim(),
            mensagem.trim(),
            tipo
        ]);

        return resultado.rows[0];
    },

    async listarPorUsuario(userId) {
        const resultado = await consultar(
            `SELECT id, title, message, type, is_read, created_at
             FROM notifications
             WHERE user_id = $1
             ORDER BY created_at DESC`,
            [userId]
        );

        return resultado.rows;
    },

    async marcarComoLida(id, userId) {
        const resultado = await consultar(
            `UPDATE notifications
             SET is_read = TRUE
             WHERE id = $1 AND user_id = $2
             RETURNING *`,
            [id, userId]
        );

        return resultado.rows[0] || null;
    },

    async marcarTodasComoLidas(userId) {
        const resultado = await consultar(
            `UPDATE notifications
             SET is_read = TRUE
             WHERE user_id = $1 AND is_read = FALSE
             RETURNING id`,
            [userId]
        );

        return resultado.rowCount;
    },

    async excluir(id, userId) {
        const resultado = await consultar(
            `DELETE FROM notifications
             WHERE id = $1 AND user_id = $2
             RETURNING id`,
            [id, userId]
        );

        return resultado.rows[0] || null;
    }
};

module.exports = NotificationModel;
  
