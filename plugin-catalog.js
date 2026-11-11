
const catalogo = [
    {
        id: "essentialsx",
        nome: "EssentialsX",
        descricao: "Adiciona comandos e ferramentas administrativas.",
        categoria: "Administração",
        plataforma: "Spigot",
        extensao: ".jar"
    },
    {
        id: "luckperms",
        nome: "LuckPerms",
        descricao: "Gerencia permissões e grupos de jogadores.",
        categoria: "Permissões",
        plataforma: "Bukkit",
        extensao: ".jar"
    },
    {
        id: "worldedit",
        nome: "WorldEdit",
        descricao: "Ferramentas para edição de construções.",
        categoria: "Construção",
        plataforma: "Bukkit",
        extensao: ".jar"
    },
    {
        id: "vault",
        nome: "Vault",
        descricao: "Integração entre plugins de economia e permissões.",
        categoria: "Integração",
        plataforma: "Bukkit",
        extensao: ".jar"
    }
];

function listarPlugins() {
    return catalogo;
}

function buscarPlugin(id) {
    return catalogo.find(
        plugin => plugin.id === id
    ) || null;
}

function buscarPorCategoria(categoria) {
    return catalogo.filter(
        plugin =>
            plugin.categoria.toLowerCase() ===
            String(categoria).toLowerCase()
    );
}

function buscarPorNome(nome) {
    const pesquisa = String(nome).toLowerCase();

    return catalogo.filter(
        plugin =>
            plugin.nome.toLowerCase().includes(pesquisa)
    );
}

module.exports = {
    listarPlugins,
    buscarPlugin,
    buscarPorCategoria,
    buscarPorNome
};
      
