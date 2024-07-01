const mongoose = require('mongoose');

// Definição do esquema e modelo do Logger
const loggerSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        required: true,
        default: Date.now
    }
});

const Logger = mongoose.model('Logger', loggerSchema);

module.exports = Logger;