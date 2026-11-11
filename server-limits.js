
const ServerModel = require("./server-model");

const PLANOS = {
    FREE: {
        memoriaMB: 1024,
        jogadores: 10,
        quantidadeServidores: 1
    },

    PRO: {
        memoriaMB: 4096,
        jogadores: 30,
        quantidadeServidores: 3
    },

    PREMIUM: {
        memoriaMB: 8192,
        jogadores: 100,
        quantidadeServidores: 5
    }
};

function obterLimites(plano) {
    const nomePlano = String(plano || "FREE").toUpperCase();

    return PLANOS[nomePlano] || PLANOS.FREE;
}

async function verificarQuantidadeServidores(userId, plano) {
    const limites = obterLimites(plano);

    const resultado = await ServerModel.listarPorUsuario(userId);

    return {
        permitido: resultado.length < limites.quantidadeServidores,
        quantidadeAtual: resultado.length,
        limite: limites.quantidadeServidores
    };
}

function verificarMemoria(plano, memoriaSolicitada) {
    const limites = obterLimites(plano);

    return (
        Number.isInteger(memoriaSolicitada) &&
        memoriaSolicitada > 0 &&
        memoriaSolicitada <= limites.memoriaMB
    );
}

function verificarJogadores(plano, quantidade) {
    const limites = obterLimites(plano);

    return (
        Number.isInteger(quantidade) &&
        quantidade > 0 &&
        quantidade <= limites.jogadores
    );
}

module.exports = {
    PLANOS,
    obterLimites,
    verificarQuantidadeServidores,
    verificarMemoria,
    verificarJogadores
};
  
