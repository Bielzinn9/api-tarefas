
require('dotenv').config();

const app = require('./app');
const pool = require('./config/database');

const PORT = process.env.PORT || 3000;

async function iniciarServidor() {
    try {
        // Verifica a conexão com o PostgreSQL
        await pool.query('SELECT 1');

        console.log('Conexão com PostgreSQL estabelecida!');

        app.listen(PORT, () => {
            console.log(`API rodando na porta ${PORT}`);
        });
    } catch (erro) {
        console.error('Erro ao conectar com PostgreSQL:', erro.message);
        process.exit(1);
    }
}

iniciarServidor();
