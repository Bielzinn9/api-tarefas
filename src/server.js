
const express = require('express');

const app = express();
const PORT = 3000;

// Permite receber dados em JSON
app.use(express.json());

// Lista inicial de tarefas
let tarefas = [
    { id: 1, titulo: 'Estudar Docker', concluida: false },
    { id: 2, titulo: 'Criar uma API', concluida: false }
];

// Rota principal
app.get('/', (req, res) => {
    res.json({
        mensagem: 'API de Tarefas funcionando!',
        status: 'online'
    });
});

// Listar todas as tarefas
app.get('/tarefas', (req, res) => {
    res.json(tarefas);
});

// Cadastrar uma nova tarefa
app.post('/tarefas', (req, res) => {
    const { titulo } = req.body;

    if (!titulo) {
        return res.status(400).json({
            erro: 'O título da tarefa é obrigatório.'
        });
    }

    const novaTarefa = {
        id: Date.now(),
        titulo: titulo,
        concluida: false
    };

    tarefas.push(novaTarefa);

    res.status(201).json(novaTarefa);
});

// Excluir uma tarefa
app.delete('/tarefas/:id', (req, res) => {
    const id = Number(req.params.id);

    const existe = tarefas.some(tarefa => tarefa.id === id);

    if (!existe) {
        return res.status(404).json({
            erro: 'Tarefa não encontrada.'
        });
    }

    tarefas = tarefas.filter(tarefa => tarefa.id !== id);

    res.json({
        mensagem: 'Tarefa excluída com sucesso!'
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`API rodando em http://localhost:${PORT}`);
});
