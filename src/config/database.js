const { Sequelize } = require('sequelize');
const mongoose = require('mongoose');

class Database {
    constructor() {
        this.init();
        this.mongoInit();
    }

    init() {
        this.db = new Sequelize('dbprojectandtask', 'postgres', '8525', {
            host: 'localhost',
            dialect: 'postgres',
            logging: console.log, // Adicione logs para depuração
        });

        // Teste a conexão com o banco de dados
        this.db.authenticate()
            .then(() => {
                console.log('Conexão com o banco de dados estabelecida com sucesso.');
            })
            .catch(err => {
                console.error('Erro ao conectar ao banco de dados:', err);
            });
    }

    mongoInit() {
        mongoose.connect('mongodb://localhost:27017/admin', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => {
            console.log('Conexão com o MongoDB estabelecida com sucesso.');
        })
        .catch(err => {
            console.error('Erro ao conectar ao MongoDB:', err);
        });
    }
}

const database = new Database();

module.exports = {
    database,
    sequelize: database.db,
    Sequelize // Adicionei esta linha para exportar o Sequelize
};
