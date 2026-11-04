
const express = require('express');
const router = express.Router();

const tarefaService = require('../services/tarefaService');

// Listar todas as tarefas
router.get('/', async (req, res) => {
    try {
        const tarefas = await tarefaService.listarTarefas();
        res.status(200).json(tarefas);
    } catch (erro) {
        res.status(500).json({ erro: 'Erro ao listar tarefas.' });
    }
});

// Buscar tarefa por ID
router.get('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        const tarefa = await tarefaService.buscarTarefa(id);

        res.status(200).json(tarefa);
    } catch (erro) {
        const status = erro.message === 'Tarefa não encontrada.' ? 404 : 400;
        res.status(status).json({ erro: erro.message });
    }
});

// Criar tarefa
router.post('/', async (req, res) => {
    try {
        const { titulo } = req.body;
        const tarefa = await tarefaService.criarTarefa(titulo);

        res.status(201).json(tarefa);
    } catch (erro) {
        res.status(400).json({ erro: erro.message });
    }
});

// Excluir tarefa
router.delete('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        await tarefaService.excluirTarefa(id);

        res.status(200).json({
            mensagem: 'Tarefa excluída com sucesso!'
        });
    } catch (erro) {
        const status = erro.message === 'Tarefa não encontrada.' ? 404 : 400;
        res.status(status).json({ erro: erro.message });
    }
});

module.exports = router;
