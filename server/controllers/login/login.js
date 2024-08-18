const db = require("../../config/database")
const bcrypt = require('bcrypt')

async function autenticaLogin(req, res) {

    try {
        const {
            email,
            senha
        } = req.body;

        const resultado = await db.query(`SELECT * FROM cadastro_usuarios WHERE email = '${email}'`);

        if (!resultado || resultado.recordset.length === 0) {
            return res.status(404).send({ message: "Email não encontrado." });
        }

        const senhaArmazenada = resultado.recordset[0].senha;

        const senhaCorreta = await bcrypt.compare(senha, senhaArmazenada);

        if (senhaCorreta) {
            res.status(200).send({ message: "Login realizado com sucesso." });
        } else {
            res.status(401).send({ message: "Senha incorreta." });
        }

    } catch (error) {
        return res.status(500).send({
            message: "Ocorreu um erro ao tentar realizar o login: " + error.message,
        });
    }
}

module.exports = {
    autenticaLogin,
}