const db = require("../../config/database")

async function buscaEmpresas(req, res) {
    try {

        const buscarDados = await db.query(`
            SELECT * FROM cadastro_empresas   
            `)

        if (buscarDados.recordset.length != 0) {
            return res.status(200).send({
                data: buscarDados.recordset
            })
        } else {
            return res.status(406).send({
                message: "Não foi encontrada nenhuma informação"
            })
        }

    } catch(error) {
        return res.status(500).send({
            message: "Ocorreu um erro ao tentar buscar usuários: " + error.message
        })
    }
}

async function cadastraEmpresa(req,res){
    try{
        const {
            cnpj,
            razaoSocial,
            endereco,
            telefone,
            email,
        } = req.body

        await db.query(`
            INSERT INTO cadastro_empresas (
            cnpj,
            razao_social,
            endereco,
            telefone,
            email
            ) VALUES (
            '${cnpj}',
            '${razaoSocial}',
            '${endereco}',
            '${telefone}',
            '${email}'
            )
            `)

            return res.status(200).send({
                message: "Empresa cadastrada com sucesso"
            })
    } catch(error) {
        return res.status(500).send({
            message: "Ocorreu um erro ao tentar cadastrar a empresa: " + error.message
        })
    }
}

module.exports = {
    buscaEmpresas,
    cadastraEmpresa
}