
let armazenamento = null;

function configurarArmazenamento(adapter) {
    const metodosObrigatorios = [
        "criar",
        "listarPorUsuario",
        "marcarComoLida",
        "excluir"
    ];

    for (const metodo of metodosObrigatorios) {
        if (typeof adapter?.[metodo] !== "function") {
            throw new Error(
                `O armazenamento precisa implementar: ${metodo}`
            );
        }
    }

    armazenamento = adapter;
}

function obterArmazenamento() {
    if (!armazenamento) {
        throw new Error(
            "O armazenamento de notificações não foi configurado."
        );
    }

    return armazenamento;
}

async function criarNotificacao({
    usuarioId,
    titulo,
    mensagem,
    tipo = "INFO"
}) {
    if (!usuarioId || !titulo || !mensagem) {
        throw new Error("Dados da notificação incompletos.");
    }

    const tiposPermitidos = [
        "INFO",
        "SUCCESS",
        "WARNING",
        "ERROR"
    ];

    if (!tiposPermitidos.includes(tipo)) {
        throw new Error("Tipo de notificação inválido.");
    }

    return obterArmazenamento().criar({
        usuarioId,
        titulo,
        mensagem,
        tipo,
        lida: false,
        criadaEm: new Date()
    });
}

async function listarNotificacoes(usuarioId) {
    if (!usuarioId) {
        throw new Error("Usuário não informado.");
    }

    return obterArmazenamento().listarPorUsuario(usuarioId);
}

async function marcarComoLida(usuarioId, notificacaoId) {
    if (!usuarioId || !notificacaoId) {
        throw new Error("Dados da notificação incompletos.");
    }

    return obterArmazenamento().marcarComoLida(
        usuarioId,
        notificacaoId
    );
}

async function excluirNotificacao(usuarioId, notificacaoId) {
    if (!usuarioId || !notificacaoId) {
        throw new Error("Dados da notificação incompletos.");
    }

    return obterArmazenamento().excluir(
        usuarioId,
        notificacaoId
    );
}

module.exports = {
    configurarArmazenamento,
    criarNotificacao,
    listarNotificacoes,
    marcarComoLida,
    excluirNotificacao
};
                  
