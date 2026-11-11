
const ServerModel = require("./server-model");

async function criarBackup(serverId, userId, infraestrutura) {
    if (!serverId || !userId) {
        throw new Error("Dados do servidor não informados.");
    }

    if (
        !infraestrutura ||
        typeof infraestrutura.criarBackup !== "function"
    ) {
        throw new Error("Sistema de backup não configurado.");
    }

    const servidor = await ServerModel.buscarPorId(serverId);

    if (!servidor || String(servidor.user_id) !== String(userId)) {
        throw new Error("Servidor não encontrado.");
    }

    const resultado = await infraestrutura.criarBackup(serverId);

    if (!resultado || !resultado.id) {
        throw new Error("Não foi possível criar o backup.");
    }

    return {
        sucesso: true,
        backup: {
            id: resultado.id,
            criadoEm: resultado.criadoEm || new Date().toISOString(),
            tamanho: resultado.tamanho || null
        }
    };
}

async function listarBackups(serverId, userId, infraestrutura) {
    if (!serverId || !userId) {
        throw new Error("Dados não informados.");
    }

    if (
        !infraestrutura ||
        typeof infraestrutura.listarBackups !== "function"
    ) {
        throw new Error("Sistema de backup não configurado.");
    }

    const servidor = await ServerModel.buscarPorId(serverId);

    if (!servidor || String(servidor.user_id) !== String(userId)) {
        throw new Error("Servidor não encontrado.");
    }

    const backups = await infraestrutura.listarBackups(serverId);

    return Array.isArray(backups) ? backups : [];
}

module.exports = {
    criarBackup,
    listarBackups
};
        
