const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/api/register', (req, res) => {
    const { username, email, password } = req.body;
    
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    // Simulação de sucesso
    return res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
