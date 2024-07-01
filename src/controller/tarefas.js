const Tarefa = require('../model/tarefa');

class TarefaController {
    async  criarTarefa(titulo, descricao, dataCriacao, dataConclusao, status, projetoID) {
        if (!titulo || !descricao || !dataCriacao || !projetoID) {
            throw new Error('Título, descrição, data de criação e projetoID são obrigatórios');
        }
    
        const tarefa = await Tarefa.create({ 
            titulo, 
            descricao, 
            dataCriacao, 
            dataConclusao, 
            status: status || 'pendente', // Status inicial como pendente se não fornecido
            projetoID 
        });
    
        return tarefa;
    }

    async alterarTarefa(id, titulo, descricao, dataConclusao, status, projetoID) {
        if (!id || !titulo || !descricao || !status || !projetoID) {
            throw new Error('Id, título, descrição, status e projetoID são obrigatórios');
        }

        const tarefa = await this.obterTarefaPorId(id);

        tarefa.titulo = titulo;
        tarefa.descricao = descricao;
        tarefa.dataConclusao = dataConclusao;
        tarefa.status = status;
        tarefa.projetoID = projetoID;
        await tarefa.save();

        return tarefa;
    }

    async deletarTarefa(id) {
        if (!id) {
            throw new Error('Id é obrigatório');
        }

        const tarefa = await this.obterTarefaPorId(id);
        await tarefa.destroy();
    }

    async listarTarefas(projetoID) {
        return Tarefa.findAll({ where: { projetoID: projetoID } });
    }

    async listarTodasTarefas() {
        return Tarefa.findAll();
    }

    async obterTarefaPorId(id) {
        if (!id) {
            throw new Error('Id é obrigatório');
        }

        const tarefa = await Tarefa.findByPk(id);

        if (!tarefa) {
            throw new Error('Tarefa não encontrada');
        }

        return tarefa;
    }

    async atualizarParcialTarefa(id, dadosAtualizados) {
        if (!id || !dadosAtualizados) {
            throw new Error('Id e dados atualizados são obrigatórios');
        }

        const tarefa = await this.obterTarefaPorId(id);

        Object.keys(dadosAtualizados).forEach(key => {
            tarefa[key] = dadosAtualizados[key];
        });

        await tarefa.save();

        return tarefa;
    }
}

module.exports = new TarefaController();
