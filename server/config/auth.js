const jwt = require("jsonwebtoken")
const SECRETKEY = "BolotaJoseValdir"

function verificaJWT(req, res, next) {

    const { authorization } = req.headers

    if (!authorization)
        return res
            .status(401)
            .json({ status: 401, auth: false, message: "Token não informado." });
        jwt.verify(authorization, SECRETKEY, function (erro) {
            if (erro)
                return res.status(403).json({
                    status: 403,
                    auth: false,
                    message: "Falha ao validar o token informado."
                });
            next()
        });
    }


module.exports = { verificaJWT }