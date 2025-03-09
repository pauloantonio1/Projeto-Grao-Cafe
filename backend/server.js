const express = require('express');
const sql = require('mssql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Configuração do SQL Server
const config = {
    user: 'app_user', // app_user
    password: 'graocafe123', // graocafe123
    server: 'localhost\\SQLEXPRESS', // ou o endereço do seu servidor SQL
    database: 'graocafe',
    options: {
        encrypt: true, // Para conexões seguras (recomendado)
        trustServerCertificate: true // Para desenvolvimento local
    }
};

// Conectar ao banco de dados
sql.connect(config, (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    } else {
        console.log('Conectado ao banco de dados SQL Server');
    }
});

// Rota para lidar com o login
app.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    try {
        const request = new sql.Request();
        const query = `SELECT * FROM usuarios WHERE email = @email AND senha = @senha`;
        request.input('email', sql.VarChar, email);
        request.input('senha', sql.VarChar, senha);

        const result = await request.query(query);

        if (result.recordset.length > 0) {
            res.status(200).send('Login bem-sucedido');
        } else {
            res.status(401).send('Credenciais inválidas');
        }
    } catch (err) {
        res.status(500).send('Erro no servidor');
    }
});

// Rota para lidar com o cadastro
app.post('/cadastro', async (req, res) => {
    const { email, senha } = req.body;

    try {
        const request = new sql.Request();
        const query = `INSERT INTO usuarios (email, senha) VALUES (@email, @senha)`;
        request.input('email', sql.VarChar, email);
        request.input('senha', sql.VarChar, senha);

        await request.query(query);
        res.status(201).send('Usuário cadastrado com sucesso');
    } catch (err) {
        res.status(500).send('Erro no servidor');
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});