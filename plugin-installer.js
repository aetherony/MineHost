
const fs = require("fs/promises");
const path = require("path");

const DIRETORIO_PLUGINS = path.resolve(
    process.env.PLUGINS_DIRECTORY || "./storage/plugins"
);

const EXTENSOES_PERMITIDAS = [".jar"];

async function prepararDiretorio() {
    await fs.mkdir(DIRETORIO_PLUGINS, {
        recursive: true
    });
}

function validarNomeArquivo(nome) {
    if (
        typeof nome !== "string" ||
        nome !== path.basename(nome) ||
        !EXTENSOES_PERMITIDAS.includes(path.extname(nome).toLowerCase())
    ) {
        throw new Error("Nome de arquivo de plugin inválido.");
    }

    return nome;
}

async function instalarPlugin(nome, conteudo) {
    validarNomeArquivo(nome);

    if (!Buffer.isBuffer(conteudo)) {
        throw new Error("O conteúdo do plugin precisa ser um arquivo válido.");
    }

    if (conteudo.length === 0) {
        throw new Error("O arquivo do plugin está vazio.");
    }

    await prepararDiretorio();

    const destino = path.join(DIRETORIO_PLUGINS, nome);

    await fs.writeFile(destino, conteudo, {
        flag: "wx",
        mode: 0o600
    });

    return {
        sucesso: true,
        arquivo: nome,
        mensagem: "Plugin recebido e armazenado."
    };
}

async function listarPlugins() {
    await prepararDiretorio();

    const arquivos = await fs.readdir(DIRETORIO_PLUGINS);

    return arquivos.filter((arquivo) =>
        EXTENSOES_PERMITIDAS.includes(
            path.extname(arquivo).toLowerCase()
        )
    );
}

async function removerPlugin(nome) {
    validarNomeArquivo(nome);

    const destino = path.join(DIRETORIO_PLUGINS, nome);

    await fs.unlink(destino);

    return {
        sucesso: true,
        mensagem: "Plugin removido."
    };
}

module.exports = {
    instalarPlugin,
    listarPlugins,
    removerPlugin
};
          
