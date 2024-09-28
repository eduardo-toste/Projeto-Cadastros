const express = require("express");
const { verificaJWT } = require("../../config/auth")

const {
    buscaEmpresas,
    cadastraEmpresa,
    excluiEmpresa,
    buscarEmpresaSelecionada,
    salvarEmpresaSelecionada

} = require("../../controllers/cadastro/cadastroEmpresa");
const routes = express.Router();

routes.get("/busca/empresas/", buscaEmpresas)
routes.post("/cadastra/empresa/", cadastraEmpresa)
routes.delete("/exclui/empresa/:idExcluido", excluiEmpresa)
routes.get("/busca/empresa/selecionada/:idEmpresaSelecionada", buscarEmpresaSelecionada)
routes.put("/edita/empresa/selecionada/", salvarEmpresaSelecionada)


module.exports = routes;