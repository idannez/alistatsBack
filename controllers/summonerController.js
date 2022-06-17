const Summoner = require("../models/Summoner");
const fetch = require("cross-fetch");
require('dotenv').config({path: 'variables.env'});

exports.mostrarSummoner = async (req, res) => {
        fetch('https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/'+req.params.name+'?api_key='+process.env.API_KEY)
        .then(data=>data.json())
        .then(data=>{
                if(!data.status){
                    res.send(data);
                }else{
                    res.send('ERROR');
                }
        })
        .catch(error => res.status(500).send('ERROR: '+error));
}