const express = require("express");
const { verificaJWT } = require("../../config/auth")

const {
    buscaEmpresas,
    cadastraEmpresa,
    excluiEmpresa

} = require("../../controllers/cadastro/cadastroEmpresa");
const routes = express.Router();

routes.get("/busca/empresas/", buscaEmpresas)
routes.post("/cadastra/empresa/", cadastraEmpresa)
routes.delete("/exclui/empresa/:idExcluido", excluiEmpresa)


module.exports = routes;