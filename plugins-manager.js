
const PluginsManager = {
    plugins: [
        {
            id: "essentialsx",
            nome: "EssentialsX",
            descricao: "Comandos e ferramentas administrativas.",
            categoria: "Administração",
            tipo: "Plugin"
        },
        {
            id: "worldedit",
            nome: "WorldEdit",
            descricao: "Ferramentas de edição de mapas.",
            categoria: "Construção",
            tipo: "Plugin"
        },
        {
            id: "luckperms",
            nome: "LuckPerms",
            descricao: "Gerenciamento de permissões.",
            categoria: "Administração",
            tipo: "Plugin"
        },
        {
            id: "viaversion",
            nome: "ViaVersion",
            descricao: "Compatibilidade entre versões.",
            categoria: "Compatibilidade",
            tipo: "Plugin"
        }
    ],

    listar() {
        return this.plugins;
    },

    buscar(id) {
        return this.plugins.find(plugin => plugin.id === id) || null;
    },

    pesquisar(termo) {
        const pesquisa = termo.toLowerCase().trim();

        return this.plugins.filter(plugin =>
            plugin.nome.toLowerCase().includes(pesquisa) ||
            plugin.descricao.toLowerCase().includes(pesquisa) ||
            plugin.categoria.toLowerCase().includes(pesquisa)
        );
    },

    porCategoria(categoria) {
        return this.plugins.filter(
            plugin => plugin.categoria === categoria
        );
    },

    adicionar(plugin) {
        if (!plugin || !plugin.id || !plugin.nome) {
            return {
                sucesso: false,
                mensagem: "Dados do plugin inválidos."
            };
        }

        if (this.buscar(plugin.id)) {
            return {
                sucesso: false,
                mensagem: "Esse plugin já está cadastrado."
            };
        }

        this.plugins.push(plugin);

        return {
            sucesso: true,
            mensagem: "Plugin adicionado à lista."
        };
    }
};

window.PluginsManager = PluginsManager;
      
