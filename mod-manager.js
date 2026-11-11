
const fs = require("fs/promises");
const path = require("path");

const DIRETORIO_MODS = path.resolve(
    process.env.MODS_DIRECTORY || "./storage/mods"
);

const EXTENSOES_PERMITIDAS = [".jar"];

async function prepararDiretorio() {
    await fs.mkdir(DIRETORIO_MODS, {
        recursive: true
    });
}

function validarNome(nome) {
    if (
        typeof nome !== "string" ||
        nome !== path.basename(nome) ||
        !EXTENSOES_PERMITIDAS.includes(
            path.extname(nome).toLowerCase()
        )
    ) {
        throw new Error("Nome de mod inválido.");
    }

    return nome;
}

async function adicionarMod(nome, conteudo) {
    validarNome(nome);

    if (!Buffer.isBuffer(conteudo) || conteudo.length === 0) {
        throw new Error("Arquivo de mod inválido ou vazio.");
    }

    await prepararDiretorio();

    const destino = path.join(DIRETORIO_MODS, nome);

    await fs.writeFile(destino, conteudo, {
        flag: "wx",
        mode: 0o600
    });

    return {
        sucesso: true,
        arquivo: nome,
        mensagem: "Mod armazenado com sucesso."
    };
}

async function listarMods() {
    await prepararDiretorio();

    const arquivos = await fs.readdir(DIRETORIO_MODS);

    return arquivos.filter(arquivo =>
        EXTENSOES_PERMITIDAS.includes(
            path.extname(arquivo).toLowerCase()
        )
    );
}

async function removerMod(nome) {
    validarNome(nome);

    const destino = path.join(DIRETORIO_MODS, nome);

    await fs.unlink(destino);

    return {
        sucesso: true,
        mensagem: "Mod removido com sucesso."
    };
}

module.exports = {
    adicionarMod,
    listarMods,
    removerMod
};
                       
