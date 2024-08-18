const mssql = require('mssql');

const sqlConfig = {
    user: 'sa',
    password: '12345',
    database: 'PROJETO_FKL',
    server: 'localhost',
    port: 1433,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: true, // Utilize false se o SQL Server não estiver configurado para usar criptografia.
        trustServerCertificate: true // Altere para true para ignorar problemas de certificado.
    }
};

mssql.connect(sqlConfig).then(function () {
    console.log("Conectado ao banco com sucesso");
}).catch(function (erro) {
    console.error('Erro de conexão:', erro);
});

module.exports = mssql;