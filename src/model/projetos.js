const { sequelize, Sequelize } = require('../config/database');
const User = require('./usuario');

class Projeto {
    constructor() {
        this.model = sequelize.define('projetos', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            titulo: {
                type: Sequelize.STRING,
                allowNull: false
            },
            descricao: {
                type: Sequelize.STRING,
                allowNull: false
            },
            dataCriacao: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW
            },
            autorID: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {         
                    model: User, 
                    key: 'id'          
                }
            }
        });

        this.model.belongsTo(User, { foreignKey: 'autorID', as: 'usuario' });
    }
}

module.exports = new Projeto().model;
