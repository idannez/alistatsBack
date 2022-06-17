const mongoose = require('mongoose');

const SummonerSchema = mongoose.Schema({
    metadata: {
        type: Map,
        required: true
    },
    info: {
        type: Map,
        required: true
    },
    region: {
        type:String,
        required: false
    },
    identifier:{
        type:String,
        required: false
    }
},{collection: 'summonersmatch'});

module.exports = mongoose.model('SummonerMatch', SummonerSchema);