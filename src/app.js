
const express = require('express');
const tarefaRoutes = require('./routes/tarefaRoutes');

const app = express();

app.use(express.json());

// Rota principal
app.get('/', (req, res) => {
    res.status(200).json({
        mensagem: 'API de Tarefas funcionando!',
        status: 'online'
    });
});

// Rotas de tarefas
app.use('/tarefas', tarefaRoutes);

// Tratamento de rotas inexistentes
app.use((req, res) => {
    res.status(404).json({
        erro: 'Rota não encontrada.'
    });
});

module.exports = app;
