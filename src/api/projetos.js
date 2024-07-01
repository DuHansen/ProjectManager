const ProjetoController = require('../controller/projetos');


class ProjetoApi {
    async criarProjeto(req, res) {
        const { titulo, descricao, dataCriacao, autorID } = req.body;

        try {
            
            const projeto = await ProjetoController.criarProjeto(titulo, descricao, dataCriacao, autorID);
            
            return res.status(201).send(projeto);
        } catch (error) {
            return res.status(400).send({ error: error.message });
        }
    }

    async alterarProjeto(req, res) {
        const { id } = req.params;
        const { titulo, descricao, autorID } = req.body;

        try {
            const projeto = await ProjetoController.alterarProjeto(Number(id), titulo, descricao, autorID);
            return res.status(200).send(projeto);
        } catch (error) {
            return res.status(400).send({ error: error.message });
        }
    }

    async deletarProjeto(req, res) {
        const { id } = req.params;

        try {
            await ProjetoController.deletarProjeto(Number(id));
            return res.status(200).send({ message: "Deletado com sucesso!" });
        } catch (error) {
            return res.status(400).send({ error: error.message });
        }
    }

    async listarProjetos(req, res) {
        const { autorID } = req.params;

        try {
            const projetos = await ProjetoController.listarProjetos(autorID);
            return res.status(200).send(projetos);
        } catch (error) {
            return res.status(400).send({ error: error.message });
        }
    }

    async listarTodosProjetos(req, res) {
        try {
            const projetos = await ProjetoController.listarTodosProjetos();
            return res.status(200).send(projetos);
        } catch (error) {
            return res.status(400).send({ error: error.message });
        }
    }

    async obterProjetoPorId(req, res) {
        const { id } = req.params;

        try {
            const projeto = await ProjetoController.obterProjetoPorId(Number(id));
            return res.status(200).send(projeto);
        } catch (error) {
            return res.status(400).send({ error: error.message });
        }
    }

    async atualizarParcialProjeto(req, res) {
        const { id } = req.params;
        const dadosAtualizados = req.body;

        try {
            const projeto = await ProjetoController.atualizarParcialProjeto(Number(id), dadosAtualizados);
            return res.status(200).send(projeto);
        } catch (error) {
            return res.status(400).send({ error: error.message });
        }
    }
}

module.exports = new ProjetoApi();
