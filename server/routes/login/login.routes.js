const express = require("express");
const {
    autenticaLogin,

} = require("../../controllers/login/login");
const routes = express.Router();

routes.post("/login/", autenticaLogin)

module.exports = routes;