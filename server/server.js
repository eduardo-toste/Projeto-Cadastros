// Importando o módulo 'express' para criar um aplicativo web
const express = require("express")

// Criando uma instância do aplicativo Express
const app = express()

// Importando as rotas definidas no arquivo './routes/routes'
const routesLogin = require("./routes/login/login.routes")
const routesCadastroUsuario = require("./routes/cadastro/cadastroUsuario.routes")
const routesCadastroEmpresa = require("./routes/cadastro/cadastroEmpresa.routes")

// Importando o módulo 'cors' para lidar com política de mesma origem
const cors = require("cors")

// Usando o middleware 'cors' para permitir requisições de diferentes origens
app.use(cors())

// Importando o módulo 'body-parser' para processar corpos de requisição
const bodyParser = require("body-parser")

// Configurando o middleware 'body-parser' para analisar dados de formulário URL-encoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// app.use(routes)
app.use(routesLogin)
app.use(routesCadastroUsuario)
app.use(routesCadastroEmpresa)

// Definindo a porta em que o servidor Express será executado
const port = 8000

app.listen(port, function () {
    console.log(`RODANDO NA PORTA: http://localhost:` + port)
})