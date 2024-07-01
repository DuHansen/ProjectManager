const request = require('supertest');
const { app, server } = require('../../../src/app');
const database = require('../../../src/config/database');

describe('Testando adicionar tarefa', () => {
    beforeAll(async () => {
        await database.db.sync({ force: true }); // Sincroniza o banco de dados antes de todos os testes

        // Adiciona um usuário para garantir que o userId está disponível
        const userResponse = await request(app)
            .post('/users')
            .send({ nome: 'luisa', email: 'luisa@example.com', senha: '123' })
            .expect(201);

        global.userId = userResponse.body.usuario.id;

        // Adiciona um projeto para garantir que o projetoId está disponível
        const projetoResponse = await request(app)
            .post('/projetos')
            .send({ 
                nome: 'Casa', 
                descricao: 'Comprar', 
                dataCriacao: '2024-02-22', 
                autorID: global.userId // Usa o ID do usuário criado
            })
            .expect(201);

        global.projetoId = projetoResponse.body.id;
    });

    afterAll(() => {
        server.close(); // Fecha o servidor após os testes
    });

    test('Post api deve adicionar tarefa', async () => {
        const response = await request(app)
            .post('/tarefas')
            .send({ 
                titulo: 'Limpar a casa', 
                descricao: 'Comprar produtos de limpeza', 
                dataCriacao: '2024-02-22', 
                dataConclusao: '2024-02-25', 
                status: 'pendente', 
                projetoID: global.projetoId // Usa o ID do projeto criado
            })
            .expect(201);

        expect(response.statusCode).toBe(201);
        expect(response.body.titulo).toBe('Limpar a casa');
        expect(response.body.descricao).toBe('Comprar produtos de limpeza');
    });
});
