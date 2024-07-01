const express = require('express');
const ProjetoApi = require('../api/projetos');
const { validarTokenMiddleware } = require('../middlewares/middleware');

const router = express.Router();

router.post('/projetos', validarTokenMiddleware, ProjetoApi.criarProjeto);
router.put('/projetos', validarTokenMiddleware, ProjetoApi.alterarProjeto);
router.delete('/projetos', validarTokenMiddleware, ProjetoApi.deletarProjeto);
router.get('/projetos', validarTokenMiddleware, ProjetoApi.listarProjetos);

module.exports = router;
