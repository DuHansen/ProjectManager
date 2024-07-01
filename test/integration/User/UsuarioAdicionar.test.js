const { describe, expect, it, beforeAll, afterAll } = require('@jest/globals');
const UserController = require("../../../src/controller/usuarios");
const { sequelize } = require('../../../src/config/database.js');

describe('Testes do primeiro exercício', () => {
   
    beforeAll(async () => {
        try {
            await sequelize.authenticate();
            console.info('Iniciando TDD com jest!');
        } catch (error) {
            console.error('Erro ao conectar ao banco de dados:', error);
        }
    });

    it('Should add a name', async () => {
        const transaction = await sequelize.transaction();
        try {
            const dataTest = {
                nome: 'Eduardo',
                email: 'eduaardo@example.com',
                senha: '123456'
            };
            const addedRecord = await UserController.criarUsuario(dataTest, transaction);
            const qtdeAfterAdd = (await UserController.listarUsuarios(transaction)).length;

            // Verificações
            expect(addedRecord).toHaveProperty('id');
            expect(qtdeAfterAdd).toBeGreaterThan(0);

            await transaction.commit();
        } catch (error) {
            await transaction.rollback();
            console.error('Erro ao executar o teste:', error);
        }
    });

    afterAll(async () => {
        try {
            await sequelize.close();
            console.info('Encerrados os testes');
        } catch (error) {
            console.error('Erro ao desconectar do banco de dados:', error);
        }
    });
});
