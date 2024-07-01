const TarefaController = require('../controller/tarefas');

class TarefaApi {
    async criarTarefa(req, res) {
        const { titulo, descricao, dataCriacao, dataConclusao, status, projetoID } = req.body;
        console.log(req.body); // Adicione este log para verificar os dados recebidos
    
        try {
            const tarefa = await TarefaController.criarTarefa(titulo, descricao, dataCriacao, dataConclusao, status, projetoID);
            return res.status(201).send(tarefa);
        } catch (error) {
            return res.status(400).send({ error: error.message });
        }
    }
    

    async alterarTarefa(req, res) {
        const { id } = req.params;
        const { titulo, descricao, dataConclusao, status, projetoID } = req.body;

        try {
            const tarefa = await TarefaController.alterarTarefa(Number(id), titulo, descricao, dataConclusao, status, projetoID);
            return res.status(200).send(tarefa);
        } catch (error) {
            return res.status(400).send({ error: error.message });
        }
    }

    async deletarTarefa(req, res) {
        const { id } = req.params;

        try {
            await TarefaController.deletarTarefa(Number(id));
            return res.status(200).send({ message: "Deletado com sucesso!" });
        } catch (error) {
            return res.status(400).send({ error: error.message });
        }
    }

    async listarTarefas(req, res) {
        const { projetoID } = req.params;

        try {
            const tarefas = await TarefaController.listarTarefas(projetoID);
            return res.status(200).send(tarefas);
        } catch (error) {
            return res.status(400).send({ error: error.message });
        }
    }

    async listarTodasTarefas(req, res) {
        try {
            const tarefas = await TarefaController.listarTodasTarefas();
            return res.status(200).send(tarefas);
        } catch (error) {
            return res.status(400).send({ error: error.message });
        }
    }

    async obterTarefaPorId(req, res) {
        const { id } = req.params;

        try {
            const tarefa = await TarefaController.obterTarefaPorId(Number(id));
            return res.status(200).send(tarefa);
        } catch (error) {
            return res.status(400).send({ error: error.message });
        }
    }

    async atualizarParcialTarefa(req, res) {
        const { id } = req.params;
        const dadosAtualizados = req.body;

        try {
            const tarefa = await TarefaController.atualizarParcialTarefa(Number(id), dadosAtualizados);
            return res.status(200).send(tarefa);
        } catch (error) {
            return res.status(400).send({ error: error.message });
        }
    }
}

module.exports = new TarefaApi();
