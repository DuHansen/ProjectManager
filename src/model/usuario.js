const { sequelize, Sequelize } = require('../config/database');

class User {
    constructor() {
        this.model = sequelize.define('users', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            nome: {
                type: Sequelize.STRING
            },
            email: {
                type: Sequelize.STRING
            },
            senha: {
                type: Sequelize.STRING
            }
        });

    }
}

module.exports = new User().model;  // exporta a instância do modelo
