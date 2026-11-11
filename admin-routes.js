
const express = require("express");

const router = express.Router();

const adminController = require("./admin-controller");
const { verificarToken } = require("./auth-middleware");
const { verificarPermissao } = require("./permissions");

router.use(verificarToken);
router.use(verificarPermissao("ADMIN"));

router.get("/usuarios", adminController.listarUsuarios);

router.get("/usuarios/:id", adminController.consultarUsuario);

router.get("/servidores", adminController.listarServidores);

router.patch(
    "/usuarios/:id/cargo",
    adminController.alterarCargo
);

module.exports = router;
