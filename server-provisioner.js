
const ServerModel = require("./server-model");

const TIPOS_PERMITIDOS = [
    "Vanilla",
    "Paper",
    "Spigot"
];

function validarVersao(versao) {
    if (typeof versao !== "string") {
        return false;
    }

    const formatoValido = /^\d+\.\d+(\.\d+)?$/.test(versao);

    if (!formatoValido) {
        return false;
    }

    const partes = versao.split(".").map(Number);

    // Aceita versões até 1.50.5
    if (partes[0] !== 1) {
        return false;
    }

    if (partes[1] > 50) {
        return false;
    }

    if (partes[1] === 50 && (partes[2] || 0) > 5) {
        return false;
    }

    return true;
}

async function provisionarServidor(
    { userId, nome, versao, tipo },
    infraestrutura
) {
    if (!userId || !nome || !versao || !tipo) {
        throw new Error("Preencha todos os campos.");
    }

    if (!validarVersao(versao)) {
        throw new Error("Versão do Minecraft inválida.");
    }

    if (!TIPOS_PERMITIDOS.includes(tipo)) {
        throw new Error("Tipo de servidor inválido.");
    }

    if (
        !infraestrutura ||
        typeof infraestrutura.criarServidor !== "function"
    ) {
        throw new Error("Infraestrutura não configurada.");
    }

    const servidor = await ServerModel.criar({
        userId,
        nome,
        versao,
        tipo
    });

    try {
        await infraestrutura.criarServidor({
            id: servidor.id,
            nome: servidor.name,
            versao: servidor.version,
            tipo: servidor.type
        });

        return {
            sucesso: true,
            servidor
        };
    } catch (erro) {
        await ServerModel.atualizarStatus(
            servidor.id,
            "error"
        );

        throw new Error(
            "Não foi possível preparar o servidor."
        );
    }
}

module.exports = {
    provisionarServidor,
    validarVersao,
    TIPOS_PERMITIDOS
};
  
