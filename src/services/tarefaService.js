
const tarefaRepository = require('../repositories/tarefaRepository');

async function listarTarefas() {
    return await tarefaRepository.listarTodas();
}

async function buscarTarefa(id) {
    const tarefa = await tarefaRepository.buscarPorId(id);

    if (!tarefa) {
        throw new Error('Tarefa não encontrada.');
    }

    return tarefa;
}

async function criarTarefa(titulo) {
    if (!titulo || typeof titulo !== 'string' || !titulo.trim()) {
        throw new Error('O título da tarefa é obrigatório.');
    }

    if (titulo.trim().length > 255) {
        throw new Error('O título deve ter no máximo 255 caracteres.');
    }

    return await tarefaRepository.criar(titulo.trim());
}

async function excluirTarefa(id) {
    if (!Number.isInteger(id) || id <= 0) {
        throw new Error('ID da tarefa inválido.');
    }

    const tarefa = await tarefaRepository.excluir(id);

    if (!tarefa) {
        throw new Error('Tarefa não encontrada.');
    }

    return tarefa;
}

module.exports = {
    listarTarefas,
    buscarTarefa,
    criarTarefa,
    excluirTarefa
};
