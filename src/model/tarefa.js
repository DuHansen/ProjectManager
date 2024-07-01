const { sequelize, Sequelize } = require('../config/database');
const Projeto = require('./projetos');

class Tarefa {
    constructor() {
        this.model = sequelize.define('tarefas', {
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
            dataConclusao: {
                type: Sequelize.DATE,
                allowNull: true
            },
            status: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: 'pendente'
            },
            projetoID: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {         
                    model: Projeto, 
                    key: 'id'          
                }
            }
        });

        this.model.belongsTo(Projeto, { foreignKey: 'projetoID', as: 'projeto' });
    }
}

module.exports = new Tarefa().model;
