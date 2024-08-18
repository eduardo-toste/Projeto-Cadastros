const express = require("express");
const {
    cadastraUsuario,
} = require("../../controllers/cadastro/cadastroUsuario");
const routes = express.Router();

routes.post("/cadastra/usuario/", cadastraUsuario)

module.exports = routes;