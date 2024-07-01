const express = require('express');
const TarefaApi = require('../api/tarefas');
const { validarTokenMiddleware } = require('../middlewares/middleware');

const router = express.Router();

router.post('/tarefas', validarTokenMiddleware, TarefaApi.criarTarefa);
router.get('/tarefas', validarTokenMiddleware, TarefaApi.listarTarefas);
router.get('/tarefas', validarTokenMiddleware, TarefaApi.listarTodasTarefas);
router.get('/tarefas/:id', validarTokenMiddleware, TarefaApi.obterTarefaPorId);
router.put('/tarefas/:id', validarTokenMiddleware, TarefaApi.alterarTarefa);
router.patch('/tarefas/:id', validarTokenMiddleware, TarefaApi.atualizarParcialTarefa);
router.delete('/tarefas/:id', validarTokenMiddleware, TarefaApi.deletarTarefa);

module.exports = router;
