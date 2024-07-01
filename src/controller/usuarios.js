const User = require('../model/usuario');
const loggerController = require('./logger');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const JWT_SECRET_KEY = 'batata';

class UserController {
    async criarUsuario(data, transaction) {
        const { nome, email, senha } = data;
        if (!nome || !email || !senha) {
            loggerController.createLog('error', 'Nome, email e senha são obrigatórios');
            throw new Error('Nome, email e senha são obrigatórios');
        }

        const senhaCriptografada = await bcrypt.hash(senha, saltRounds);
        const user = await User.create({ nome, email, senha: senhaCriptografada }, { transaction });
        loggerController.createLog('success', 'Usuário criado com sucesso');

        return user;
    }

    async buscarPorId(id, transaction) {
        if (!id) {
            loggerController.createLog('error', 'Id é obrigatório');
            throw new Error('Id é obrigatório');
        }

        const user = await User.findByPk(id, { transaction });

        if (!user) {
            loggerController.createLog('error', 'Usuário não encontrado');
            throw new Error('Usuário não encontrado');
        }

        return user;
    }

    async alterarUsuario(id, data, transaction) {
        const { nome, email, senha } = data;
        if (!id || !nome || !email || !senha) {
            loggerController.createLog('error', 'Id, nome, email e senha são obrigatórios');
            throw new Error('Id, nome, email e senha são obrigatórios');
        }

        const user = await this.buscarPorId(id, transaction);

        user.nome = nome;
        user.email = email;
        const senhaCriptografada = await bcrypt.hash(senha, saltRounds);
        user.senha = senhaCriptografada;
        await user.save({ transaction });
        loggerController.createLog('success', 'Usuário alterado com sucesso');

        return user;
    }

    async deletarUsuario(id, transaction) {
        if (!id) {
            loggerController.createLog('error', 'Id é obrigatório');
            throw new Error('Id é obrigatório');
        }

        const user = await this.buscarPorId(id, transaction);

        await user.destroy({ transaction });
        loggerController.createLog('success', 'Usuário deletado com sucesso');
    }

    async listarUsuarios(transaction) {
        loggerController.createLog('success', 'Listando usuários');
        return User.findAll({ transaction });
    }

    async logarUsuario(email, senha) {
        if (!email || !senha) {
            loggerController.createLog('error', 'Email e senha são obrigatórios');
            throw new Error('Email e senha são obrigatórios');
        }

        const user = await User.findOne({ where: { email } });

        if (!user) {
            loggerController.createLog('error', 'Usuário não encontrado');
            throw new Error('Usuário não encontrado');
        }

        const senhaValida = await bcrypt.compare(senha, user.senha);

        if (!senhaValida) {
            loggerController.createLog('error', 'Senha inválida');
            throw new Error('Senha inválida');
        }

        const token = jwt.sign({ id: user.id }, JWT_SECRET_KEY, { expiresIn: '1h' });
        loggerController.createLog('success', 'Usuário logado com sucesso');

        return { user, token };
    }
}

module.exports = new UserController();
