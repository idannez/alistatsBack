const mongoose = require('mongoose');

const UsuarioSchema = mongoose.Schema({
    nombreCompleto: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    nombreUsuario: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        required: true
    }
},{collection: 'usuarios'});

module.exports = mongoose.model('Usuario', UsuarioSchema);