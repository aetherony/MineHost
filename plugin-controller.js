
const PluginController = {
    plugins: [
        {
            id: "essentialsx",
            nome: "EssentialsX",
            categoria: "Administração"
        },
        {
            id: "worldedit",
            nome: "WorldEdit",
            categoria: "Construção"
        },
        {
            id: "luckperms",
            nome: "LuckPerms",
            categoria: "Permissões"
        },
        {
            id: "viaversion",
            nome: "ViaVersion",
            categoria: "Compatibilidade"
        }
    ],

    async listar(req, res) {
        return res.json({
            sucesso: true,
            plugins: this.plugins
        });
    },

    async buscar(req, res) {
        const plugin = this.plugins.find(
            item => item.id === req.params.id
        );

        if (!plugin) {
            return res.status(404).json({
                sucesso: false,
                mensagem: "Plugin não encontrado."
            });
        }

        return res.json({
            sucesso: true,
            plugin
        });
    },

    async instalar(req, res) {
        return res.status(501).json({
            sucesso: false,
            mensagem: "Instalação aguardando integração com os servidores."
        });
    },

    async remover(req, res) {
        return res.status(501).json({
            sucesso: false,
            mensagem: "Remoção aguardando integração com os servidores."
        });
    }
};

module.exports = PluginController;
      
