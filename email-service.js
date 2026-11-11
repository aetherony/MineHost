
const nodemailer = require("nodemailer");

let transporter = null;

function configurarEmail() {
    if (!process.env.EMAIL_HOST ||
        !process.env.EMAIL_USER ||
        !process.env.EMAIL_PASSWORD) {
        throw new Error("Configurações de e-mail ausentes.");
    }

    transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT || 587),
        secure: process.env.EMAIL_SECURE === "true",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    return transporter;
}

async function enviarEmail({ para, assunto, mensagem }) {
    if (!transporter) {
        configurarEmail();
    }

    if (!para || !assunto || !mensagem) {
        throw new Error("Preencha todos os dados do e-mail.");
    }

    const resultado = await transporter.sendMail({
        from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
        to: para,
        subject: assunto,
        text: mensagem
    });

    return {
        sucesso: true,
        messageId: resultado.messageId
    };
}

async function verificarEmail() {
    if (!transporter) {
        configurarEmail();
    }

    return transporter.verify();
}

module.exports = {
    configurarEmail,
    enviarEmail,
    verificarEmail
};
          
