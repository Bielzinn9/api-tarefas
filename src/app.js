const express = require('express');
const tarefaRoutes = require('./routes/tarefaRoutes');
const { register, metricasMiddleware } = require('./config/metrics');

const app = express();

app.use(express.json());

// Registra métricas das requisições HTTP
app.use(metricasMiddleware);

// Rota principal
app.get('/', (req, res) => {
    res.status(200).json({
        mensagem: 'API de Tarefas funcionando!',
        status: 'online'
    });
});

// Endpoint de métricas para o Prometheus
app.get('/metrics', async (req, res) => {
    try {
        res.set('Content-Type', register.contentType);
        res.end(await register.metrics());
    } catch (erro) {
        res.status(500).end(erro.message);
    }
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
