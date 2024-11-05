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
                message: "Não foi encontrada nenhuma informação",
                data: buscarDados.recordset
            })
        }

    } catch (erro) {
        return res.status(500).send({
            message: "Ocorreu um erro ao tentar buscar usuários: " + erro.message
        })
    }
}

async function buscarEmpresaSelecionada(req, res) {
    try {
        const {
            idEmpresaSelecionada
        } = req.params

        const buscarDados = await db.query(`SELECT * FROM cadastro_empresas WHERE id = ${idEmpresaSelecionada}`)

        return res.status(200).send({
            data: buscarDados.recordset
        })

    } catch (erro) {
        return res.status(500).send({
            message: "Ocorreu um erro ao tentar buscar empresa: " + erro.message
        })
    }
}

async function salvarEmpresaSelecionada(req, res) {
    try {

        const {
            idEmpresa,
            cnpj,
            razaoSocial,
            endereco,
            telefone,
            email
        } = req.body

        const sqlEditaEmpresa = `
            UPDATE cadastro_empresas
            SET cnpj = '${cnpj}', razao_social = '${razaoSocial}', endereco = '${endereco}', telefone = '${telefone}', email = '${email}'
            WHERE id = ${idEmpresa}
        `
        await db.query(sqlEditaEmpresa)

        return res.status(200).send({
            message: 'Empresa atualizada com sucesso!'
        })

    } catch (erro) {
        return res.status(500).send({
            message: "Ocorreu um erro ao tentar atualizar empresa: " + erro.message
        })
    }
}

async function cadastraEmpresa(req, res) {
    try {
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
    } catch (erro) {
        return res.status(500).send({
            message: "Ocorreu um erro ao tentar cadastrar a empresa: " + erro.message
        })
    }
}

async function excluiEmpresa(req, res) {
    try {

        const {
            idExcluido
        } = req.params

        const usuarioExiste = await db.query(`SELECT id FROM cadastro_empresas WHERE id = '${idExcluido}';`)

        if (usuarioExiste.recordset.length == 0) {
            return res.status(406).send({
                message: "Este usuário não foi encontrado"
            })
        }

        await db.query(`DELETE FROM cadastro_empresas WHERE id = '${idExcluido}';`)

        return res.status(200).send({
            message: "Empresa excluida com sucesso"
        })

    } catch (erro) {
        return res.status(500).send({
            message: "Ocorreu um erro ao tentar excluir o empresa: " + erro.message
        })
    }
}

module.exports = {
    buscaEmpresas,
    cadastraEmpresa,
    excluiEmpresa,
    buscarEmpresaSelecionada,
    salvarEmpresaSelecionada
}