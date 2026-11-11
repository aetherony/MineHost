
const securityConfig = {
    helmet: {
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'"],
                styleSrc: ["'self'", "'unsafe-inline'"],
                imgSrc: ["'self'", "data:", "https:"],
                connectSrc: ["'self'"],
                objectSrc: ["'none'"],
                frameAncestors: ["'none'"]
            }
        }
    },

    cors: {
        origin: process.env.FRONTEND_URL || "http://localhost:5500",
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true
    },

    jsonLimit: "20kb",

    password: {
        minimumLength: 8,
        requireUppercase: true,
        requireLowercase: true,
        requireNumber: true
    },

    session: {
        expiration: "2h"
    }
};

module.exports = securityConfig;
