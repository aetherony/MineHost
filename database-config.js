
require("dotenv").config();

const DatabaseConfig = {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT || 5432),
    database: process.env.DB_NAME || "minehost",
    user: process.env.DB_USER || "minehost_user",

    // A senha deve ficar somente no arquivo .env.
    password: process.env.DB_PASSWORD,

    ssl: process.env.DB_SSL === "true",

    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
};

module.exports = DatabaseConfig;
