const sql = require('mssql');

const config = {
    user: 'app_user',
    password: 'graocafe123', // Mesma senha definida no SQL
    server: 'VICTOR\\SQLEXPRESS', 
    database: 'graocafe',
    options: {
        encrypt: true,          // Habilita criptografia
        trustServerCertificate: true, // Ignora validação do certificado (para desenvolvimento)
        enableArithAbort: true  // Adiciona compatibilidade
    },
    connectionTimeout: 30000    // Tempo limite aumentado
};
async function testConnection() {
    try {
        await sql.connect(config);
        console.log('Conexão com o SQL Server estabelecida com sucesso!');
    } catch (err) {
        console.error('Erro ao conectar ao SQL Server:', err);
    } finally {
        sql.close();
    }
}

testConnection();