const mongoose = require('mongoose');

const UsuarioSchema = mongoose.Schema({
    nombreCompleto: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
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
        required: false
    },
    summonerAccount: {
        type: String,
        required: false
    },
    summonerName: {
        type: String,
        required: false
    },
    discord: {
        type:String,
        required: false
    }
},{collection: 'users'});

module.exports = mongoose.model('Usuario', UsuarioSchema);