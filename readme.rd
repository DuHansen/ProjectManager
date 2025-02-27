# Gestão de Tarefas

Desenvolva um sistema de gerenciamento de projetos e tarefas utilizando Node.js. 
Este sistema permitirá que usuários criem, visualizem, editem e excluam projetos e tarefas. 
Cada projeto pode ter várias tarefas associadas, e cada tarefa terá um título, descrição, 
data de criação, data de conclusão e status.

## Entidades

* Usuário
    * ID (único)
    * Nome
    * Email
    * Senha (hash)
    * Data de criação
* Projeto
    * ID (único)
    * Nome
    * Descrição
    * Data de criação
    * ID do Usuário (relacionamento com a entidade Usuário)
* Tarefa
    * ID (único)
    * Título
    * Descrição
    * Data de criação
    * Data de conclusão (opcional)
    * Status (pendente, em andamento, concluída)
    * ID do Projeto (relacionamento com a entidade Projeto)
  
## Estrutura do Projeto

```
project-manager/
├── src/
│   ├── api/
│   │   ├── project.js
│   │   ├── task.js
│   │   └── user.js
│   ├── controllers/
│   │   ├── project.js
│   │   ├── task.js
│   │   └── user.js
│   ├── models/
│   │   ├── project.js
│   │   ├── task.js
│   │   └── user.js
│   ├── routes/
│   │   ├── project.js
│   │   ├── task.js
│   │   └── user.js
│   ├── middlewares/
│   │   └── authMiddleware.js
│   ├── config/
│   │   └── database.js
│   ├── app.js
│   └── server.js
├── package.json
└── README.md
```

## Requisitos

### Criação de Usuário

* O sistema deve permitir a criação de novos usuários com nome, email e senha.
* O email deve ser único para cada usuário.
* A senha deve ser armazenada de forma segura (hash).
  
### Autenticação

* O sistema deve permitir que usuários façam login utilizando email e senha.
* Deve ser gerado um token JWT para sessões autenticadas.

### Gerenciamento de Projetos

* Usuários autenticados podem criar novos projetos.
* Cada projeto deve ter um nome e descrição.
* Usuários podem editar e excluir seus próprios projetos.
* Usuários podem visualizar uma lista de seus projetos.

### Gerenciamento de Tarefas

* Usuários autenticados podem criar novas tarefas associadas a projetos existentes.
* Cada tarefa deve ter um título, descrição e status inicial como "pendente".
* Usuários podem editar e excluir suas próprias tarefas.
* Usuários podem visualizar uma lista de tarefas por projeto com filtros por status.
* Cada tarefa deve registrar a data de criação automaticamente e permitir a adição de uma data de conclusão.

### Validações

* Todos os campos obrigatórios devem ser validados.
* O título das tarefas deve ter um limite de caracteres (por exemplo, máximo 100 caracteres).
* O nome dos projetos deve ter um limite de caracteres (por exemplo, máximo 100 caracteres).

### Segurança

* Implementar middleware de autenticação para proteger rotas que necessitam de usuário autenticado.
* Senhas devem ser armazenadas de forma segura utilizando bcrypt.

### Tecnologias e Ferramentas

* Utilizar Node.js com Express para a criação do servidor.
* Utilizar Sequelize para ORM e banco de dados relacional (por exemplo, PostgreSQL, MySQL).
* Utilizar JWT (JSON Web Token) para autenticação.
* Utilizar bcrypt para hashing de senhas.
* Seguir as melhores práticas de segurança e estruturação de código.

### Implementação

* O projeto deve seguir uma arquitetura MVC (Model-View-Controller) para organização do código.
* Deve ser implementada a separação de responsabilidades, com controladores específicos para usuários, projetos e tarefas.
* A conexão com o banco de dados deve ser gerenciada de forma centralizada em um arquivo de configuração.
* Middleware de autenticação deve ser aplicado às rotas que requerem usuário autenticado.

## Passos Adicionais

### Containers
Containers são instâncias de imagens Docker que executam aplicações isoladas. Cada container tem seu próprio sistema de arquivos, rede, e espaço de processos.
Eles são criados a partir de imagens Docker e podem ser iniciados, parados, removidos e gerenciados de forma independente.
Exemplo: mongo-mvc e mysql-mvc são containers que você criou a partir das imagens mongo:latest e mysql:8.

### Networks
Networks são usadas para permitir a comunicação entre containers. Elas fornecem um meio para que os containers se comuniquem entre si de forma segura e eficiente.
Docker cria automaticamente uma rede padrão (bridge) para cada aplicação definida no docker-compose.yml, mas você pode definir redes personalizadas para controlar melhor a comunicação entre containers.
Exemplo: avaliacao3_default é a rede padrão criada pelo Docker Compose para sua aplicação.
Relação entre Networks e Containers
Quando você define uma rede no docker-compose.yml, todos os containers definidos nesse arquivo são automaticamente conectados a essa rede.
Isso permite que os containers se comuniquem usando os nomes dos serviços definidos no docker-compose.yml como hostnames.