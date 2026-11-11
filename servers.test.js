
const { describe, test, expect } = require("@jest/globals");

const ServerModel = require("./server-model");
const ServerLimits = require("./server-limits");

describe("Testes de servidores da MineHost", () => {
    test("deve carregar o modelo de servidores", () => {
        expect(ServerModel).toBeTruthy();
    });

    test("deve possuir funções básicas de gerenciamento", () => {
        expect(typeof ServerModel.criar).toBe("function");
        expect(typeof ServerModel.buscarPorId).toBe("function");
        expect(typeof ServerModel.listarPorUsuario).toBe("function");
    });

    test("deve retornar os limites do plano FREE", () => {
        const limites = ServerLimits.obterLimites("FREE");

        expect(limites.memoriaMB).toBe(1024);
        expect(limites.jogadores).toBe(10);
    });

    test("deve rejeitar memória acima do limite FREE", () => {
        expect(
            ServerLimits.verificarMemoria("FREE", 2048)
        ).toBe(false);
    });

    test("deve aceitar memória dentro do limite FREE", () => {
        expect(
            ServerLimits.verificarMemoria("FREE", 512)
        ).toBe(true);
    });

    test("deve rejeitar quantidade negativa de jogadores", () => {
        expect(
            ServerLimits.verificarJogadores("FREE", -1)
        ).toBe(false);
    });
});
                                                         
