
const ServerModel = require("./server-model");

const CONFIGURACOES_PADRAO = {
    motd: "Servidor hospedado pela MineHost",
    maxPlayers: 20,
    difficulty: "normal",
    gamemode: "survival",
    pvp: true,
    onlineMode: true,
    allowNether: true,
    commandBlocks: false
};

const CONFIGURACOES_PERMITIDAS = {
    difficulty: ["peaceful", "easy", "normal", "hard"],
    gamemode: ["survival", "creative", "adventure", "spectator"]
};

async function verificarProprietario(serverId, userId) {
    const servidor = await ServerModel.buscarPorId(serverId);

    if (!servidor || String(servidor.user_id) !== String(userId)) {
        throw new Error("Servidor não encontrado ou acesso negado.");
    }

    return servidor;
}

function validarConfiguracoes(configuracoes) {
    if (!configuracoes || typeof configuracoes !== "object") {
        throw new Error("Configurações inválidas.");
    }

    const resultado = {};

    if (configuracoes.motd !== undefined) {
        if (
            typeof configuracoes.motd !== "string" ||
            configuracoes.motd.length > 200
        ) {
            throw new Error("MOTD inválida.");
        }

        resultado.motd = configuracoes.motd;
    }

    if (configuracoes.maxPlayers !== undefined) {
        if (
            !Number.isInteger(configuracoes.maxPlayers) ||
            configuracoes.maxPlayers < 1 ||
            configuracoes.maxPlayers > 100
        ) {
            throw new Error("Quantidade de jogadores inválida.");
        }

        resultado.maxPlayers = configuracoes.maxPlayers;
    }

    for (const campo of ["difficulty", "gamemode"]) {
        if (configuracoes[campo] !== undefined) {
            if (!CONFIGURACOES_PERMITIDAS[campo].includes(configuracoes[campo])) {
                throw new Error(`Valor inválido para ${campo}.`);
            }

            resultado[campo] = configuracoes[campo];
        }
    }

    for (const campo of [
        "pvp",
        "onlineMode",
        "allowNether",
        "commandBlocks"
    ]) {
        if (configuracoes[campo] !== undefined) {
            if (typeof configuracoes[campo] !== "boolean") {
                throw new Error(`Valor inválido para ${campo}.`);
            }

            resultado[campo] = configuracoes[campo];
        }
    }

    return resultado;
}

async function atualizarPropriedades(
    serverId,
    userId,
    configuracoes,
    infraestrutura
) {
    await verificarProprietario(serverId, userId);

    if (
        !infraestrutura ||
        typeof infraestrutura.atualizarPropriedades !== "function"
    ) {
        throw new Error("Sistema de configurações não conectado.");
    }

    const propriedades = validarConfiguracoes(configuracoes);

    return infraestrutura.atualizarPropriedades(
        serverId,
        propriedades
    );
}

module.exports = {
    CONFIGURACOES_PADRAO,
    validarConfiguracoes,
    atualizarPropriedades
};
