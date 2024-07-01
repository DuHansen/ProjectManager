const UserController = require('../controller/usuarios');
const { sequelize } = require('../../src/config/database');

class UserApi {
    async criarUsuario(req, res) {
        const { nome, email, senha } = req.body;
        console.log('Requisição recebida:', req.body);

        const transaction = await sequelize.transaction();
        try {
            const usuario = await UserController.criarUsuario({ nome, email, senha }, transaction);
            await transaction.commit();
            return res.status(201).send({ usuario });
        } catch (error) {
            await transaction.rollback();
            console.error('Erro ao criar usuário:', error);
            return res.status(400).send({ error: error.message });
        }
    }

    async alterarUsuario(req, res) {
        const { id } = req.params;
        const { nome, email, senha } = req.body;

        const transaction = await sequelize.transaction();
        try {
            await UserController.alterarUsuario(Number(id), { nome, email, senha }, transaction);
            await transaction.commit();
            return res.status(200).send({ message: "Usuário alterado com sucesso!" });
        } catch (error) {
            await transaction.rollback();
            return res.status(400).send({ error: error.message });
        }
    }

    async deletarUsuario(req, res) {
        const { id } = req.params;

        const transaction = await sequelize.transaction();
        try {
            await UserController.deletarUsuario(Number(id), transaction);
            await transaction.commit();
            return res.status(200).send({ message: "Usuário deletado com sucesso!" });
        } catch (error) {
            await transaction.rollback();
            return res.status(400).send({ error: error.message });
        }
    }

    async listarUsuarios(req, res) {
        const transaction = await sequelize.transaction();
        try {
            const users = await UserController.listarUsuarios(transaction);
            await transaction.commit();
            return res.status(200).send(users);
        } catch (error) {
            await transaction.rollback();
            return res.status(400).send({ error: error.message });
        }
    }

    async obterUsuarioPorId(req, res) {
        const { id } = req.params;

        const transaction = await sequelize.transaction();
        try {
            const usuario = await UserController.obterUsuarioPorId(Number(id), transaction);
            await transaction.commit();
            return res.status(200).send(usuario);
        } catch (error) {
            await transaction.rollback();
            return res.status(400).send({ error: error.message });
        }
    }

    async logarUsuario(req, res) {
        try {
            const { email, senha } = req.body;
            const token = await UserController.logarUsuario(email, senha);
            return res.status(200).send(token);
        } catch (error) {
            return res.status(400).send({ error: error.message });
        }
    }
}

module.exports = new UserApi();
