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

    it('Deve listar todos os projetos', async () => {
        const response = await request(app).get('/projetos'); // Certifique-se de que o endpoint está correto

        // Verificações
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
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
