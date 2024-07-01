const request = require('supertest');
const { app } = require('../../../src/app');
const controller = require("../../../src/controller/projetos.js");
const { describe, expect, it, beforeAll, afterAll } = require('@jest/globals');
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

    it('Should add a project', async () => {
        const transaction = await sequelize.transaction();
        try {
            const dataTest = {
                titulo: 'Novo Projeto',
                descricao: 'Descrição do projeto',
                dataCriacao: '2024-02-22',
                autorID: 1
            };
            const addedRecord = await controller.criarProjeto(dataTest, transaction);
            const qtdeAfterAdd = (await controller.listarProjetos(transaction)).length;

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

describe('Testando adicionar projeto', () => {
    beforeAll(async () => {
        try {
            await sequelize.authenticate();
            console.info('Iniciando TDD com jest!');
        } catch (error) {
            console.error('Erro ao conectar ao banco de dados:', error);
        }
    });

    afterAll(() => {
        server.close(); // Fecha o servidor após os testes
    });

    test('Post api deve adicionar projeto', async () => {
        const response = await request(app)
            .post('/projetos')
            .send({ 
                titulo: 'Casa', 
                descricao: 'Comprar', 
                dataCriacao: '2024-02-22', 
                autorID: global.userId // Usa o ID do usuário criado
            })
            .expect(201);

        expect(response.statusCode).toBe(201);
        expect(response.body.titulo).toBe('Casa');
    });
});