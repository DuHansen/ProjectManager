const Projeto = require('../model/projetos');

class ProjetoController {
    async criarProjeto(titulo, descricao, dataCriacao, autorID) {
        if (!titulo || !descricao || !dataCriacao || !autorID) {
            throw new Error('Título, descrição, data de criação e autorID são obrigatórios');
        }

        const projeto = await Projeto.create({ titulo, descricao, dataCriacao, autorID });

        return projeto;
    }

    async alterarProjeto(id, titulo, descricao, autorID) {
        if (!id || !titulo || !descricao || !autorID) {
            throw new Error('Id, título, descrição e autorID são obrigatórios');
        }

        const projeto = await this.obterProjetoPorId(id);

        projeto.titulo = titulo;
        projeto.descricao = descricao;
        projeto.autorID = autorID;
        await projeto.save();

        return projeto;
    }

    async deletarProjeto(id) {
        if (!id) {
            throw new Error('Id é obrigatório');
        }

        const projeto = await this.obterProjetoPorId(id);
        await projeto.destroy();
    }

    async listarProjetos(autorID) {
        return Projeto.findAll({ where: { autorID: autorID } });
    }

    async listarTodosProjetos() {
        return Projeto.findAll();
    }

    async obterProjetoPorId(id) {
        if (!id) {
            throw new Error('Id é obrigatório');
        }

        const projeto = await Projeto.findByPk(id);

        if (!projeto) {
            throw new Error('Projeto não encontrado');
        }

        return projeto;
    }

    async atualizarParcialProjeto(id, dadosAtualizados) {
        if (!id || !dadosAtualizados) {
            throw new Error('Id e dados atualizados são obrigatórios');
        }

        const projeto = await this.obterProjetoPorId(id);

        Object.keys(dadosAtualizados).forEach(key => {
            projeto[key] = dadosAtualizados[key];
        });

        await projeto.save();

        return projeto;
    }
}

module.exports = new ProjetoController();
