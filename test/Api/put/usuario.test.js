const request = require('supertest');
const app = require('../../../src/app'); // Certifique-se de que o caminho para o seu app está correto
const { sequelize } = require('../../../src/config/database');

describe('Testes de API para Projetos', () => {
    beforeAll(async () => {
        try {
            await sequelize.authenticate();
            console.info('Iniciando TDD com jest!');
        } catch (error) {
            console.error('Erro ao conectar ao banco de dados:', error);
        }
    });

    it('Deve atualizar um projeto existente', async () => {
        // Primeiro, crie um projeto para atualizar
        const projetoCriado = await request(app)
            .post('/projetos')
            .send({
                titulo: 'Projeto Original',
                descricao: 'Descrição original do projeto',
                autorID: 1 // Certifique-se de que este ID de autor existe no seu banco de dados
            });

        const projetoID = projetoCriado.body.id;

        // Dados para atualizar o projeto
        const dadosAtualizados = {
            titulo: 'Projeto Atualizado',
            descricao: 'Descrição atualizada do projeto',
            autorID: 1
        };

        // Faça a solicitação PUT para atualizar o projeto
        const response = await request(app)
            .put(`/projetos/${projetoID}`)
            .send(dadosAtualizados);

        // Verificações
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', projetoID);
        expect(response.body.titulo).toBe(dadosAtualizados.titulo);
        expect(response.body.descricao).toBe(dadosAtualizados.descricao);
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
