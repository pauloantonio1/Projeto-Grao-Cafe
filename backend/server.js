const express = require('express');
const sql = require('mssql');
const app = express();
const port = 3000;

// Configuração da conexão com o SQL Server
const config = {
    user: 'app_user', // app_user
    password: 'graocafe123', // graocafe123
    server: 'localhost', // Substitua pelo nome do servidor
    database: 'GraoCafe', // Substitua pelo nome do banco de dados
    options: {
        encrypt: true, // Habilita a criptografia
        trustServerCertificate: true // Confia no certificado autoassinado
    }
};

// Middleware para processar JSON
app.use(express.json());

// Rota para salvar uma encomenda
app.post('/encomendas', async (req, res) => {
    try {
        const { nome, telefone, produto, quantidade, data } = req.body;

        // Conecta ao banco de dados
        await sql.connect(config);

        // Insere os dados na tabela Encomendas
        const result = await sql.query`
            INSERT INTO Encomendas (Nome, Telefone, Produto, Quantidade, DataEntrega)
            VALUES (${nome}, ${telefone}, ${produto}, ${quantidade}, ${data})
        `;

        res.status(201).json({ message: 'Encomenda salva com sucesso!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao salvar a encomenda' });
    } finally {
        // Fecha a conexão com o banco de dados
        sql.close();
    }
});

// Rota para buscar todas as encomendas
app.get('/encomendas', async (req, res) => {
    try {
        // Conecta ao banco de dados
        await sql.connect(config);

        // Busca todas as encomendas
        const result = await sql.query`SELECT * FROM Encomendas`;

        res.status(200).json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar encomendas' });
    } finally {
        // Fecha a conexão com o banco de dados
        sql.close();
    }
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});