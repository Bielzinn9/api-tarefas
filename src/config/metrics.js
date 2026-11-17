const client = require('@prometheus-io/client');

// Coleta métricas internas do Node.js
client.collectDefaultMetrics();

// Contador de requisições HTTP
const requisicoes = new client.Counter({
    name: 'api_http_requests_total',
    help: 'Total de requisicoes HTTP recebidas pela API',
    labelNames: ['method', 'status_code']
});

// Contador de erros HTTP
const erros = new client.Counter({
    name: 'api_http_errors_total',
    help: 'Total de respostas HTTP com erro',
    labelNames: ['method', 'status_code']
});

// Histograma do tempo de resposta
const tempoResposta = new client.Histogram({
    name: 'api_http_request_duration_seconds',
    help: 'Tempo de resposta das requisicoes HTTP em segundos',
    labelNames: ['method', 'status_code'],
    buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2, 5]
});

// Middleware para monitorar as requisicoes
function metricasMiddleware(req, res, next) {
    if (req.path === '/metrics') {
        return next();
    }

    const inicio = process.hrtime.bigint();

    res.on('finish', () => {
        const duracao = Number(process.hrtime.bigint() - inicio) / 1e9;

        const labels = {
            method: req.method,
            status_code: String(res.statusCode)
        };

        requisicoes.inc(labels);
        tempoResposta.observe(labels, duracao);

        if (res.statusCode >= 400) {
            erros.inc(labels);
        }
    });

    next();
}

module.exports = {
    register: client.register,
    metricasMiddleware
};
