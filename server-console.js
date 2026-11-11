
const ServerModel = require("./server-model");

async function verificarAcesso(serverId, userId) {
    const servidor = await ServerModel.buscarPorId(serverId);

    if (!servidor || String(servidor.user_id) !== String(userId)) {
        throw new Error("Servidor não encontrado ou acesso negado.");
    }

    return servidor;
}

async function obterLogs(serverId, userId, infraestrutura) {
    await verificarAcesso(serverId, userId);

    if (
        !infraestrutura ||
        typeof infraestrutura.obterLogs !== "function"
    ) {
        throw new Error("Console não configurado.");
    }

    const logs = await infraestrutura.obterLogs(serverId);

    return Array.isArray(logs) ? logs : [];
}

async function enviarComando(serverId, userId, comando, infraestrutura) {
    await verificarAcesso(serverId, userId);

    if (
        typeof comando !== "string" ||
        !comando.trim() ||
        comando.length > 200
    ) {
        throw new Error("Comando inválido.");
    }

    if (
        !infraestrutura ||
        typeof infraestrutura.enviarComando !== "function"
    ) {
        throw new Error("Console não configurado.");
    }

    return infraestrutura.enviarComando(
        serverId,
        comando.trim()
    );
}

module.exports = {
    obterLogs,
    enviarComando
};
      
