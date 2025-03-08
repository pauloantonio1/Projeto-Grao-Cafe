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
    user: 'app_user',
    password: 'graocafe123',
    server: 'VICTOR\\SQLEXPRESS',
    database: 'graocafe',
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

// Conexão com o banco
sql.connect(config)
    .then(() => console.log('Conectado ao SQL Server'))
    .catch(err => console.error('Erro de conexão:', err));

// Rotas
// ===== Teste Básico =====
app.get('/', (req, res) => {
    res.send('API Grão Café Online! Use Postman para testar: \n\n' +
        '1. POST /cadastro com { "email": "teste@email.com", "senha": "123" }\n' +
        '2. POST /login com os mesmos dados');
});

// ===== Rota de Cadastro (POST) =====
app.post('/cadastro', async (req, res) => {
    /* Exemplo de corpo para Postman:
    {
        "email": "cliente@graocafe.com",
        "senha": "senha_secreta"
    }*/
    
    try {
        const { email, senha } = req.body;
        
        // Validação básica
        if (!email || !senha) {
            return res.status(400).json({
                success: false,
                message: "Email e senha são obrigatórios"
            });
        }

        const request = new sql.Request();
        await request
            .input('email', sql.VarChar, email)
            .input('senha', sql.VarChar, senha)
            .query('INSERT INTO usuarios (email, senha) VALUES (@email, @senha)');

        res.status(201).json({
            success: true,
            message: "Cadastro realizado!",
            data: { email }
        });

    } catch (err) {
        console.error('Erro no cadastro:', err);
        res.status(500).json({
            success: false,
            message: err.message.includes('UNIQUE') 
                ? "Email já cadastrado" 
                : "Erro no servidor"
        });
    }
});

// ===== Rota de Login (POST) =====
app.post('/login', async (req, res) => {
    /* Exemplo de corpo para Postman:
    {
        "email": "cliente@graocafe.com",
        "senha": "senha_secreta"
    }*/
    
    try {
        const { email, senha } = req.body;
        const request = new sql.Request();
        
        const result = await request
            .input('email', sql.VarChar, email)
            .input('senha', sql.VarChar, senha)
            .query('SELECT * FROM usuarios WHERE email = @email AND senha = @senha');

        if (result.recordset.length > 0) {
            res.json({
                success: true,
                message: "Login bem-sucedido!",
                user: result.recordset[0]
            });
        } else {
            res.status(401).json({
                success: false,
                message: "Email ou senha inválidos"
            });
        }
        
    } catch (err) {
        console.error('Erro no login:', err);
        res.status(500).json({
            success: false,
            message: "Erro no servidor"
        });
    }
});

app.listen(port, () => {
    console.log(`\n=== Para testar no Postman ===
1. ENVIE UM POST para http://localhost:3000/cadastro com:
   {
       "email": "seu@email.com",
       "senha": "sua_senha"
   }

2. DEPOIS ENVIE UM POST para http://localhost:3000/login com os mesmos dados\n`);
});