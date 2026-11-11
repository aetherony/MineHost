
const request = require("supertest");
const app = require("./server");

describe("API MineHost", () => {
    test("deve responder à rota de status", async () => {
        const resposta = await request(app).get("/status");

        expect([200, 404]).toContain(resposta.status);
    });

    test("deve responder à rota principal", async () => {
        const resposta = await request(app).get("/");

        expect(resposta.status).toBeLessThan(500);
    });
});
  
