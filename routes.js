
const express = require("express");
const router = express.Router();

const AuthController = require("./auth-controller");
const UserController = require("./user-controller");
const ServerController = require("./server-controller");
const PluginController = require("./plugin-controller");
const verificarAutenticacao = require("./auth-middleware");

// Autenticação
router.post("/auth/register", AuthController.registrar);
router.post("/auth/login", AuthController.login);
router.post("/auth/logout", verificarAutenticacao, AuthController.sair);

// Usuários protegidos
router.get("/users", verificarAutenticacao, UserController.listar);
router.get("/users/:id", verificarAutenticacao, UserController.buscar);
router.put("/users/:id", verificarAutenticacao, UserController.atualizar);
router.delete("/users/:id", verificarAutenticacao, UserController.excluir);

// Servidores Minecraft
router.get("/servers", verificarAutenticacao, ServerController.listar);
router.post("/servers", verificarAutenticacao, ServerController.criar);
router.get("/servers/:id", verificarAutenticacao, ServerController.buscar);
router.post("/servers/:id/start", verificarAutenticacao, ServerController.iniciar);
router.post("/servers/:id/stop", verificarAutenticacao, ServerController.parar);
router.delete("/servers/:id", verificarAutenticacao, ServerController.excluir);

// Plugins
router.get("/plugins", PluginController.listar);
router.get("/plugins/:id", PluginController.buscar);
router.post("/plugins/install", verificarAutenticacao, PluginController.instalar);
router.delete("/plugins/:id", verificarAutenticacao, PluginController.remover);

module.exports = router;
