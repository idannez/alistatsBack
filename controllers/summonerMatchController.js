const SummonerMatch = require("../models/SummonerMatch");
const fetch = require("cross-fetch");
require('dotenv').config({ path: 'variables.env' });

const platforms = ["americas","europe","asia"];

const platformRouting = {
    "br": platforms[0], "eun": platforms[1], "euw": platforms[1], "jp": platforms[2], "kr": platforms[2], "lan": platforms[0], "las": platforms[0],
    "na": platforms[0], "oc": platforms[0], "tr": platforms[1], "ru": platforms[1]
};

exports.mostrarSummonerMatchs = async (req, res) => {

    var matchesId;
    var allMatches = [];

    await fetch('https://'+platformRouting[req.params.region]+'.api.riotgames.com/lol/match/v5/matches/by-puuid/' + req.params.puuid + '/ids?start=0&count=10&api_key=' + process.env.API_KEY)
        .then(data => data.json())
        .then(data => {
            if (!data.status) {
                matchesId = data;
            } else {
                return res.json({ 'error': 'true' });
            }
        })
        .catch(error => res.status(500).send('ERROR: ' + error));
    if (matchesId != undefined && !matchesId.status) {
        allMatches = await Promise.all(matchesId.map(async (matchId) => {
            let BBDDSMatch=await SummonerMatch.findOne({ identifier:matchId , platform:req.params.platform});
            if(BBDDSMatch){
                return BBDDSMatch;
            }else{
                dato = await getMatch(matchId,req.params.region);
                SMatch = new SummonerMatch(dato);
                SMatch.identifier = matchId;
                SMatch.save();
                return SMatch;
            }
        }))
        res.json(allMatches);
    }

}

async function getMatch(matchId,region) {

    let match = await fetch('https://'+platformRouting[region]+'.api.riotgames.com/lol/match/v5/matches/' + matchId + '?api_key=' + process.env.API_KEY)
        .then(data => data.json())
        .then(data => data)

    return match

}