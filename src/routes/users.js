const express = require('express');
const UserApi = require('../api/usuarios');
const { validarTokenMiddleware } = require('../middlewares/middleware');

const router = express.Router();

router.post('/users', UserApi.criarUsuario);
router.post('/login', UserApi.logarUsuario);
router.get('/users', validarTokenMiddleware, UserApi.listarUsuarios);
router.get('/users/:id', validarTokenMiddleware, UserApi.obterUsuarioPorId);
router.put('/users/:id', validarTokenMiddleware, UserApi.alterarUsuario);
router.delete('/users/:id', validarTokenMiddleware, UserApi.deletarUsuario);

module.exports = router;
