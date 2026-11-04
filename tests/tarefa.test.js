const request = require('supertest');

jest.mock('../src/config/database', () => ({
    query: jest.fn()
}));

const pool = require('../src/config/database');
const app = require('../src/app');

describe('API de Tarefas', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('GET / deve retornar a mensagem da API', async () => {
        const resposta = await request(app).get('/');

        expect(resposta.status).toBe(200);
        expect(resposta.body.status).toBe('online');
    });

    test('GET /tarefas deve listar as tarefas', async () => {
        pool.query.mockResolvedValue({
            rows: [
                { id: 1, titulo: 'Estudar Docker', concluida: false }
            ]
        });

        const resposta = await request(app).get('/tarefas');

        expect(resposta.status).toBe(200);
        expect(resposta.body).toHaveLength(1);
        expect(resposta.body[0].titulo).toBe('Estudar Docker');
    });

    test('GET /tarefas/:id deve buscar uma tarefa', async () => {
        pool.query.mockResolvedValue({
            rows: [
                { id: 1, titulo: 'Estudar Docker', concluida: false }
            ]
        });

        const resposta = await request(app).get('/tarefas/1');

        expect(resposta.status).toBe(200);
        expect(resposta.body.id).toBe(1);
    });

    test('GET /tarefas/:id deve retornar 404 se não encontrar', async () => {
        pool.query.mockResolvedValue({
            rows: []
        });

        const resposta = await request(app).get('/tarefas/999');

        expect(resposta.status).toBe(404);
    });

    test('POST /tarefas deve cadastrar uma tarefa', async () => {
        pool.query.mockResolvedValue({
            rows: [
                { id: 2, titulo: 'Estudar Node.js', concluida: false }
            ]
        });

        const resposta = await request(app)
            .post('/tarefas')
            .send({ titulo: 'Estudar Node.js' });

        expect(resposta.status).toBe(201);
        expect(resposta.body.titulo).toBe('Estudar Node.js');
    });

    test('POST /tarefas não deve aceitar título vazio', async () => {
        const resposta = await request(app)
            .post('/tarefas')
            .send({ titulo: '' });

        expect(resposta.status).toBe(400);
        expect(pool.query).not.toHaveBeenCalled();
    });

    test('DELETE /tarefas/:id deve excluir uma tarefa', async () => {
        pool.query.mockResolvedValue({
            rows: [
                { id: 1, titulo: 'Estudar Docker', concluida: false }
            ]
        });

        const resposta = await request(app).delete('/tarefas/1');

        expect(resposta.status).toBe(200);
        expect(resposta.body.mensagem).toBe('Tarefa excluída com sucesso!');
    });

    test('GET /rota-inexistente deve retornar 404', async () => {
        const resposta = await request(app).get('/rota-inexistente');

        expect(resposta.status).toBe(404);
    });

});
