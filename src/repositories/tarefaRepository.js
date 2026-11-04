
const pool = require('../config/database');

async function listarTodas() {
    const resultado = await pool.query(
        'SELECT * FROM tarefas ORDER BY id ASC'
    );

    return resultado.rows;
}

async function buscarPorId(id) {
    const resultado = await pool.query(
        'SELECT * FROM tarefas WHERE id = $1',
        [id]
    );

    return resultado.rows[0];
}

async function criar(titulo) {
    const resultado = await pool.query(
        'INSERT INTO tarefas (titulo) VALUES ($1) RETURNING *',
        [titulo]
    );

    return resultado.rows[0];
}

async function excluir(id) {
    const resultado = await pool.query(
        'DELETE FROM tarefas WHERE id = $1 RETURNING *',
        [id]
    );

    return resultado.rows[0];
}

module.exports = {
    listarTodas,
    buscarPorId,
    criar,
    excluir
};
