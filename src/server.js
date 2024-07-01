const { sequelize } = require('../src/config/database');
const app = require('./app');

console.log('Starting server....');

sequelize.sync({ force: true })
    .then(() => {
        app.listen(8000, () => {
            console.log('Server is running on port 8000');
        });
    })
    .catch((error) => {
        console.error('Error connecting to the database', error);
    });
