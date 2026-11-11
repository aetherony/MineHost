
const fs = require("fs/promises");
const path = require("path");

const DIRETORIO_SERVIDORES = path.resolve(
    process.env.SERVERS_DIRECTORY || "./storage/servers"
);

function validarIdServidor(id) {
    if (
        typeof id !== "string" ||
        !/^[a-zA-Z0-9_-]{1,64}$/.test(id)
    ) {
        throw new Error("ID de servidor inválido.");
    }

    return id;
}

function validarCaminhoArquivo(caminho) {
    if (
        typeof caminho !== "string" ||
        caminho.length === 0 ||
        caminho.includes("\0") ||
        path.isAbsolute(caminho)
    ) {
        throw new Error("Caminho de arquivo inválido.");
    }

    const partes = caminho.replace(/\\/g, "/").split("/");

    if (partes.some(parte =>
        parte === ".." || parte === "." || parte === ""
    )) {
        throw new Error("Caminho não permitido.");
    }

    return partes.join(path.sep);
}

async function obterDiretorio(id) {
    validarIdServidor(id);

    const diretorio = path.join(DIRETORIO_SERVIDORES, id);

    await fs.mkdir(diretorio, {
        recursive: true
    });

    return diretorio;
}

async function listarArquivos(id, caminho = "") {
    const raiz = await obterDiretorio(id);

    const destino = caminho
        ? path.join(raiz, validarCaminhoArquivo(caminho))
        : raiz;

    const itens = await fs.readdir(destino, {
        withFileTypes: true
    });

    return itens.map(item => ({
        nome: item.name,
        tipo: item.isDirectory() ? "pasta" : "arquivo"
    }));
}

async function criarPasta(id, caminho) {
    const raiz = await obterDiretorio(id);

    const destino = path.join(
        raiz,
        validarCaminhoArquivo(caminho)
    );

    await fs.mkdir(destino, {
        recursive: true
    });

    return {
        sucesso: true,
        mensagem: "Pasta criada."
    };
}

async function lerArquivo(id, caminho) {
    const raiz = await obterDiretorio(id);

    const destino = path.join(
        raiz,
        validarCaminhoArquivo(caminho)
    );

    const conteudo = await fs.readFile(destino, "utf8");

    return conteudo;
}

async function salvarArquivo(id, caminho, conteudo) {
    const raiz = await obterDiretorio(id);

    const destino = path.join(
        raiz,
        validarCaminhoArquivo(caminho)
    );

    const realRaiz = await fs.realpath(raiz);

    await fs.mkdir(path.dirname(destino), {
        recursive: true
    });

    const pastaReal = await fs.realpath(path.dirname(destino));

    if (
        pastaReal !== realRaiz &&
        !pastaReal.startsWith(realRaiz + path.sep)
    ) {
        throw new Error("Acesso fora da pasta do servidor.");
    }

    await fs.writeFile(destino, conteudo, {
        encoding: "utf8",
        mode: 0o600
    });

    return {
        sucesso: true,
        mensagem: "Arquivo salvo."
    };
}

module.exports = {
    listarArquivos,
    criarPasta,
    lerArquivo,
    salvarArquivo
};
  
