const mongoose = require('mongoose');

const SummonerRankSchema = mongoose.Schema({
    leagueId: {
        type: String,
        required: true
    },
    summonerId: {
        type: String,
        required: true
    },
    summonerName: {
        type: String,
        required: true
    },
    queueType: {
        type: String,
        required: true
    },
    tier: {
        type: String,
        required: true
    },
    rank: {
        type: String,
        required: true
    },
    leaguePoints: {
        type: Number,
        required: true
    },
    wins: {
        type: Number,
        required: true
    },
    losses: {
        type: Number,
        required: true
    },
    hotStreak: {
        type: Boolean,
        required: true
    },
    veteran: {
        type: Boolean,
        required: true
    },
    freshBlood: {
        type: Boolean,
        required: true
    },
    inactive: {
        type: Boolean,
        required: true
    },
    miniSeries: {
        type: Map,
        required: false
    },
    refreshTime: {
        type:Number,
        required: false
    },
    platform: {
        type:String,
        required: false
    }
},{collection: 'summonersrank'});

module.exports = mongoose.model('SummonerRank', SummonerRankSchema);