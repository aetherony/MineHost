
const { describe, test, expect } = require("@jest/globals");

const password = require("./password");

describe("Testes de autenticação da MineHost", () => {
    test("deve gerar um hash diferente da senha original", async () => {
        const senha = "SenhaTeste123!";
        const hash = await password.gerarHash(senha);

        expect(hash).not.toBe(senha);
        expect(hash).toBeTruthy();
    });

    test("deve validar uma senha correta", async () => {
        const senha = "SenhaTeste123!";
        const hash = await password.gerarHash(senha);

        const resultado = await password.verificarSenha(
            senha,
            hash
        );

        expect(resultado).toBe(true);
    });

    test("deve rejeitar uma senha incorreta", async () => {
        const hash = await password.gerarHash("SenhaCorreta123!");

        const resultado = await password.verificarSenha(
            "SenhaErrada123!",
            hash
        );

        expect(resultado).toBe(false);
    });
});
         
