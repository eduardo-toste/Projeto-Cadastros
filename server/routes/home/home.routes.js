const express = require("express");
const { verificaJWT } = require("../../config/auth")

const {
} = require("../../controllers/cadastro/cadastroUsuario");
const routes = express.Router();


module.exports = routes;