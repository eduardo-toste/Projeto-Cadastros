const express = require("express");
const {
    buscaEmpresas,
    cadastraEmpresa

} = require("../../controllers/cadastro/cadastroEmpresa");
const routes = express.Router();

routes.get("/busca/empresas/", buscaEmpresas)
routes.post("/cadastra/empresa/", cadastraEmpresa)


module.exports = routes;