// src/middlewares/middleware.js
const jwt = require('jsonwebtoken');
const loggerController = require('../controller/logger'); // Certifique-se de importar corretamente
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'batata'; // Certifique-se de definir a chave secreta no seu ambiente

// Função para validar o token
async function validarToken(token) {
    try {
        const payload = jwt.verify(token, JWT_SECRET_KEY);
        return payload;
    } catch (error) {
        loggerController.createLog('error', 'Token inválido');
        throw new Error('Token inválido');
    }
}

// Middleware para validar o token na requisição
async function validarTokenMiddleware(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(400).send({ error: 'Token não fornecido' });
    }

    try {
        await validarToken(token);
        next();
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
}

// Funções de configuração de CORS (exemplo)
function configureCors(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
}

const corsOptions = {
    origin: '*',
    methods: 'GET,PUT,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization'
};

function allowCors(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
}

module.exports = {
    validarTokenMiddleware,
    configureCors,
    corsOptions,
    allowCors
};
