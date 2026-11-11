
const express = require("express");
const router = express.Router();

const AuthController = require("./auth-controller");
const UserController = require("./user-controller");
const ServerController = require("./server-controller");
const PluginController = require("./plugin-controller");

// Autenticação
router.post("/auth/register", AuthController.registrar);
router.post("/auth/login", AuthController.login);
router.post("/auth/logout", AuthController.sair);

// Usuários
router.get("/users", UserController.listar);
router.get("/users/:id", UserController.buscar);
router.put("/users/:id", UserController.atualizar);
router.delete("/users/:id", UserController.excluir);

// Servidores Minecraft
router.get("/servers", ServerController.listar);
router.post("/servers", ServerController.criar);
router.get("/servers/:id", ServerController.buscar);
router.post("/servers/:id/start", ServerController.iniciar);
router.post("/servers/:id/stop", ServerController.parar);
router.delete("/servers/:id", ServerController.excluir);

// Plugins
router.get("/plugins", PluginController.listar);
router.get("/plugins/:id", PluginController.buscar);
router.post("/plugins/install", PluginController.instalar);
router.delete("/plugins/:id", PluginController.remover);

module.exports = router;
