const db = require("../../config/database")
const bcrypt = require('bcrypt');


async function cadastraUsuario(req, res) {
    
    try {
        const {
            nome,
            senha,
            email
        } = req.body

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        await db.query(`
        INSERT INTO cadastro_usuarios (
        nome_completo,
        email,
        senha
        ) VALUES (
        '${nome}',
        '${email}',
        '${senhaCriptografada}'
        )
        `)

        return res.status(200).send({
            message: "Usuário cadastrado com sucesso"
        })
    } catch (error) {
        return res.status(500).send({
            message: "Ocorreu um erro ao tentar cadastrar usuário: " + error.message
        })
    }
}

module.exports = {
    cadastraUsuario,
}