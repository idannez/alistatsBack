const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

//Creamos el servidor
const app = express();

//Conectamos a la BD
conectarDB();
app.use(cors());

app.use(express.json());

app.use('/summoners', require('./routes/summoners'));
app.use('/rank', require('./routes/summonersRank'));
app.use('/summoners-match', require('./routes/summonersMatch'));
app.use('/usuarios', require('./routes/usuarios'));

app.listen(4000, () => {

    console.log('Servidor funcionando correctamente')

})