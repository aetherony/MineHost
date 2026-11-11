
const catalogo = require("./plugin-catalog");

describe("Catálogo de plugins MineHost", () => {
    test("deve listar os plugins", () => {
        const plugins = catalogo.listarPlugins();

        expect(Array.isArray(plugins)).toBe(true);
        expect(plugins.length).toBeGreaterThan(0);
    });

    test("deve encontrar EssentialsX", () => {
        const plugin = catalogo.buscarPlugin("essentialsx");

        expect(plugin).not.toBeNull();
        expect(plugin.id).toBe("essentialsx");
    });

    test("deve retornar null para plugin inexistente", () => {
        const plugin = catalogo.buscarPlugin("plugin-inexistente");

        expect(plugin).toBeNull();
    });
});
         
