
const { consultar } = require("./database");

const UserModel = {
    async criar({ nome, email, senhaHash }) {
        if (!nome || !email || !senhaHash) {
            throw new Error("Preencha todos os campos.");
        }

        const sql = `
            INSERT INTO users (username, email, password_hash)
            VALUES ($1, $2, $3)
            RETURNING id, username, email, created_at
        `;

        const resultado = await consultar(sql, [
            nome.trim(),
            email.trim().toLowerCase(),
            senhaHash
        ]);

        return resultado.rows[0];
    },

    async buscarPorEmail(email) {
        const resultado = await consultar(
            "SELECT * FROM users WHERE email = $1 LIMIT 1",
            [email.trim().toLowerCase()]
        );

        return resultado.rows[0] || null;
    },

    async buscarPorId(id) {
        const resultado = await consultar(
            `SELECT id, username, email, created_at, updated_at
             FROM users WHERE id = $1`,
            [id]
        );

        return resultado.rows[0] || null;
    },

    async listar() {
        const resultado = await consultar(
            `SELECT id, username, email, created_at
             FROM users ORDER BY created_at DESC`
        );

        return resultado.rows;
    },

    async atualizar(id, { nome, email }) {
        const resultado = await consultar(
            `UPDATE users
             SET username = $2, email = $3, updated_at = NOW()
             WHERE id = $1
             RETURNING id, username, email, updated_at`,
            [id, nome.trim(), email.trim().toLowerCase()]
        );

        return resultado.rows[0] || null;
    },

    async excluir(id) {
        const resultado = await consultar(
            "DELETE FROM users WHERE id = $1 RETURNING id",
            [id]
        );

        return resultado.rows[0] || null;
    }
};

module.exports = UserModel;
      
