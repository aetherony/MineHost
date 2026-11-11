
const { describe, test, expect } = require("@jest/globals");

const UserModel = require("./user-model");

describe("Testes de usuários da MineHost", () => {
    test("deve validar a existência do modelo de usuários", () => {
        expect(UserModel).toBeTruthy();
    });

    test("deve possuir a função de buscar usuário por ID", () => {
        expect(typeof UserModel.buscarPorId).toBe("function");
    });

    test("deve possuir a função de buscar usuário por email", () => {
        expect(typeof UserModel.buscarPorEmail).toBe("function");
    });

    test("deve possuir a função de criar usuário", () => {
        expect(typeof UserModel.criar).toBe("function");
    });

    test("deve possuir a função de atualizar usuário", () => {
        expect(typeof UserModel.atualizar).toBe("function");
    });
});
         
