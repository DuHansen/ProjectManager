const express = require('express');
const cors = require('cors');
const middlewares = require('../src/middlewares/middleware');
const userRoutes = require('../src/routes/users');
const tarefaRoutes = require('../src/routes/tarefa'); // Corrigido para 'tarefas'
const projetoRoutes = require('../src/routes/projeto'); // Corrigido para 'projetos'

const app = express();

app.use(express.json());
app.use(middlewares.configureCors);
app.use(cors(middlewares.corsOptions));
app.use(middlewares.allowCors);
app.use(userRoutes);
app.use(tarefaRoutes);
app.use(projetoRoutes);

module.exports = app;
