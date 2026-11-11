
const ServerModel = require("./server-model");

const STATUS_PERMITIDOS = [
    "online",
    "offline",
    "starting",
    "stopping",
    "error"
];

async function verificarServidor(serverId, infraestrutura) {
    if (!serverId) {
        throw new Error("ID do servidor não informado.");
    }

    if (
        !infraestrutura ||
        typeof infraestrutura.obterStatus !== "function"
    ) {
        throw new Error("Monitoramento não configurado.");
    }

    const servidor = await ServerModel.buscarPorId(serverId);

    if (!servidor) {
        throw new Error("Servidor não encontrado.");
    }

    try {
        const resultado = await infraestrutura.obterStatus(serverId);

        if (
            !resultado ||
            !STATUS_PERMITIDOS.includes(resultado.status)
        ) {
            throw new Error("Status recebido é inválido.");
        }

        const servidorAtualizado =
            await ServerModel.atualizarStatus(
                serverId,
                resultado.status
            );

        return {
            sucesso: true,
            servidor: servidorAtualizado,
            recursos: {
                memoria: resultado.memoria ?? null,
                cpu: resultado.cpu ?? null,
                jogadores: resultado.jogadores ?? null
            }
        };
    } catch (erro) {
        return {
            sucesso: false,
            mensagem: "Não foi possível verificar o servidor."
        };
    }
}

module.exports = {
    verificarServidor,
    STATUS_PERMITIDOS
};
          
