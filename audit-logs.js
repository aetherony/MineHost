
let armazenamento = null;

function configurarAuditLogs(adapter) {
    if (
        typeof adapter?.registrar !== "function" ||
        typeof adapter?.listar !== "function"
    ) {
        throw new Error(
            "O adaptador precisa implementar registrar e listar."
        );
    }

    armazenamento = adapter;
}

function obterArmazenamento() {
    if (!armazenamento) {
        throw new Error(
            "O armazenamento dos logs não foi configurado."
        );
    }

    return armazenamento;
}

async function registrarAcao({
    usuarioId,
    acao,
    detalhes = {}
}) {
    if (!usuarioId || !acao) {
        throw new Error("Usuário e ação são obrigatórios.");
    }

    return obterArmazenamento().registrar({
        usuarioId,
        acao,
        detalhes,
        data: new Date()
    });
}

async function listarLogs(filtros = {}) {
    return obterArmazenamento().listar(filtros);
}

module.exports = {
    configurarAuditLogs,
    registrarAcao,
    listarLogs
};
  
