const Summoner = require("../models/Summoner");
const fetch = require("cross-fetch");
require('dotenv').config({ path: 'variables.env' });

const platformRouting = {
    "br": "br1", "eun": "eun1", "euw": "euw1", "jp": "jp1", "kr": "kr", "lan": "la1", "las": "la2", "na": "na1"
    , "oc": "oc1", "tr": "tr1", "ru": "ru"
};

exports.mostrarSummoner = async (req, res) => {

    try {
        let summoner = await Summoner.findOne({ name: { '$regex': req.params.name, $options: 'i' }, platform:req.params.platform});

        if (!summoner) {
            await fetch('https://'+platformRouting[req.params.platform]+'.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + req.params.name + '?api_key=' + process.env.API_KEY)
                .then(data => data.json())
                .then(data => {
                    if (!data.status) {
                        summoner = new Summoner(data);
                        summoner.refreshTime = Date.now();
                        summoner.platform=req.params.platform;
                        summoner.save();
                        res.send(summoner);
                    } else {
                        res.json({ 'error': 'true' });
                    }   
                })
                .catch(error => res.status(500).send('ERROR: ' + error));
        } else {
            if (summoner.refreshTime != undefined && summoner.refreshTime != "" && summoner.refreshTime + 120000 > Date.now()) {
                res.json(summoner);
            } else {
                await fetch('https://'+platformRouting[req.params.platform]+'.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + req.params.name + '?api_key=' + process.env.API_KEY)
                    .then(data => data.json())
                    .then(data => {
                        if (data.status) {
                            res.json({ 'error': 'true' });
                        }
                        return data;
                    })
                    .then(data => {
                        if (!data.status) {
                            summoner = new Summoner(data);
                            summoner.refreshTime = Date.now();
                            summoner.platform=req.params.platform;
                            Summoner.findOneAndUpdate({ name: summoner.name, platform:req.params.platform }, summoner);
                            res.send(summoner);
                        }
                    })
                    .catch(error => res.status(500).send('ERROR: ' + error));
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('ERROR');
    }
}