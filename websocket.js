
const { WebSocketServer } = require("ws");

let wss = null;

function iniciarWebSocket(servidorHttp, autenticarUsuario) {
    if (wss) {
        throw new Error("WebSocket já foi iniciado.");
    }

    if (typeof autenticarUsuario !== "function") {
        throw new Error("Autenticação de usuários obrigatória.");
    }

    wss = new WebSocketServer({
        server: servidorHttp,
        path: "/ws",
        maxPayload: 16 * 1024
    });

    wss.on("connection", async (socket, request) => {
        try {
            const usuario = await autenticarUsuario(request);

            if (!usuario || !usuario.id) {
                socket.close(1008, "Não autorizado");
                return;
            }

            socket.usuarioId = String(usuario.id);

            socket.on("message", (dados) => {
                let mensagem;

                try {
                    mensagem = JSON.parse(dados.toString());
                } catch {
                    socket.close(1007, "Mensagem inválida");
                    return;
                }

                if (
                    !mensagem ||
                    typeof mensagem.tipo !== "string"
                ) {
                    socket.close(1008, "Formato não permitido");
                    return;
                }

                if (mensagem.tipo === "ping") {
                    socket.send(JSON.stringify({
                        tipo: "pong"
                    }));
                }
            });

            socket.on("error", (erro) => {
                console.error("Erro WebSocket:", erro.message);
            });

        } catch {
            socket.close(1008, "Falha na autenticação");
        }
    });

    return wss;
}

function enviarParaUsuario(usuarioId, dados) {
    if (!wss) {
        throw new Error("WebSocket não iniciado.");
    }

    const mensagem = JSON.stringify(dados);

    wss.clients.forEach((cliente) => {
        if (
            cliente.readyState === 1 &&
            cliente.usuarioId === String(usuarioId)
        ) {
            cliente.send(mensagem);
        }
    });
}

function encerrarWebSocket() {
    if (!wss) return;

    wss.close();
    wss = null;
}

module.exports = {
    iniciarWebSocket,
    enviarParaUsuario,
    encerrarWebSocket
};
           
