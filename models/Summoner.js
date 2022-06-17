const mongoose = require('mongoose');

const SummonerSchema = mongoose.Schema({
    accountId: {
        type: String,
        required: true
    },
    profileIconId: {
        type: Number,
        required: true
    },
    revisionDate: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    puuid: {
        type: String,
        required: true
    },
    summonerLevel: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Summoner', SummonerSchema);