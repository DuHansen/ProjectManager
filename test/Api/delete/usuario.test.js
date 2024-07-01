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

    it('Deve deletar um projeto existente', async () => {
        // Primeiro, crie um projeto para deletar
        const projetoCriado = await request(app)
            .post('/projetos')
            .send({
                titulo: 'Projeto a ser deletado',
                descricao: 'Descrição do projeto a ser deletado',
                autorID: 1 // Certifique-se de que este ID de autor existe no seu banco de dados
            });

        const projetoID = projetoCriado.body.id;

        // Faça a solicitação DELETE para deletar o projeto
        const response = await request(app)
            .delete(`/projetos/${projetoID}`);

        // Verificações
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Projeto deletado com sucesso!');

        // Verifique se o projeto foi realmente deletado
        const projetoDeletado = await request(app).get(`/projetos/${projetoID}`);
        expect(projetoDeletado.status).toBe(404);
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
