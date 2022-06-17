const SummonerRank = require("../models/SummonerRank");
const fetch = require("cross-fetch");
require('dotenv').config({ path: 'variables.env' });

const platformRouting = {
    "br": "br1", "eun": "eun1", "euw": "euw1", "jp": "jp1", "kr": "kr", "lan": "la1", "las": "la2", "na": "na1"
    , "oc": "oc1", "tr": "tr1", "ru": "ru"
};

exports.mostrarSummonerRank = async (req, res) => {

    try {
        let summonerRank = await SummonerRank.find({ summonerId: { '$regex': req.params.summonerId, $options: 'i' }, region:req.params.platform });

        if (!summonerRank[0]) {
            fetch('https://'+platformRouting[req.params.platform]+'.api.riotgames.com/lol/league/v4/entries/by-summoner/' + req.params.summonerId + '?api_key=' + process.env.API_KEY)
                .then(data => data.json())
                .then(data => {
                    data.forEach(data => {
                        if (!data.status) {
                            if (data.queueType=="RANKED_SOLO_5x5" || data.queueType=="RANKED_FLEX_SR") {
                                summonerRank = new SummonerRank(data);
                                summonerRank.refreshTime = Date.now();
                                summonerRank.platform=req.params.platform;
                                summonerRank.save();
                            }
                        } else {
                            res.json({ 'error': 'true' });
                        }
                    });
                    res.send(data);
                })
                .catch(error => res.status(500).send('ERROR: ' + error));
        } else {
            let cumple = true;
            summonerRank.forEach(data => {
                if (data.refreshTime == undefined || data.refreshTime == "" || data.refreshTime + 120000 <= Date.now()) {
                    cumple = false;
                }
            })
            if (cumple) {
                res.json(summonerRank);
            } else {
                fetch('https://'+platformRouting[req.params.platform]+'.api.riotgames.com/lol/league/v4/entries/by-summoner/' + req.params.summonerId + '?api_key=' + process.env.API_KEY)
                    .then(data => data.json())
                    .then(data => {
                        data.forEach(data => {
                            if (data.status) {
                                res.json({ 'error': 'true' });
                            }
                        })
                        return data;
                    })
                    .then(data => {
                        data.forEach(data => {
                            if (!data.status) {
                                if (data.queueType=="RANKED_SOLO_5x5" || data.queueType=="RANKED_FLEX_SR") {
                                    summonerRank = new SummonerRank(data);
                                    summonerRank.platform=req.params.platform;
                                    summonerRank.refreshTime = Date.now();
                                    SummonerRank.updateOne({ summonerId: data.summonerId, queueType: data.queueType, platform:req.params.platform}, summonerRank);
                                }
                            }
                        })
                        res.send(data);
                    })
                    .catch(error => res.status(500).send('ERROR: ' + error));
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('ERROR');
    }
}