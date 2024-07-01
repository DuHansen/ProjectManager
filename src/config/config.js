module.exports = {
    development: {
        username: 'postgres',
        password: '8525',
        database: 'dbprojectandtask',
        host: 'localhost',
        dialect: 'postgres',
        logging: console.log, // Adicione logs para depuração
    },
    mongodb: {
        uri: 'mongodb://localhost:27017/admin',
        options: {
           // useNewUrlParser: true,
           // useUnifiedTopology: true,
        },
    },
};
