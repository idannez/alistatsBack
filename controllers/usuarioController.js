const jwt = require('jsonwebtoken');
const Usuario = require("../models/Usuario");


exports.crearUsuario = async (req, res) => {

    try {

        let usuario;

        //Creamos nuestro usuario
        usuario = new Usuario(req.body);

        if (await Usuario.findOne({ email: usuario.email })) {
            res.json({'error':'Existing email'});
        } else {
            await usuario.save();
            res.send(usuario);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('ERROR');
    }
}

exports.mostrarUsuarios = async (req, res) => {

    try {

        const usuarios = await Usuario.find();
        res.json(usuarios);


    } catch (error) {
        console.log(error);
        res.status(500).send('ERROR');
    }
}

exports.mostrarUsuarioPorEmail = async (req, res) => {

    try {

        const usuarios = await Usuario.findOne({email:req.params.email});
        res.json(usuarios);


    } catch (error) {
        console.log(error);
        res.status(500).send('ERROR');
    }
}

exports.mostrarUsuarioPorUserName = async (req, res) => {

    try {

        const usuarios = await Usuario.find({nombreUsuario:req.params.uname});
        res.json(usuarios);


    } catch (error) {
        console.log(error);
        res.status(500).send('ERROR');
    }
}

exports.mostrarUsuarioPorSummonerName = async (req, res) => {

    try {

        const usuarios = await Usuario.findOne({summonerName:req.params.summonerName});
        res.json(usuarios);


    } catch (error) {
        console.log(error);
        res.status(500).send('ERROR');
    }
}

exports.actualizarUsuario = async (req, res) => {

    try {

        const { nombreCompleto, email, nombreUsuario, password, rol, summonerAccount, summonerName, discord} = req.body;
        let usuario = await Usuario.findById(req.params.id);

        if (!usuario) {
            res.status(404).json({ msg: 'No existe un usuario' });
        } else {
            usuario.nombreCompleto = nombreCompleto;
            usuario.email = email;
            usuario.nombreUsuario = nombreUsuario;
            usuario.password = password;
            usuario.rol = rol;
            usuario.summonerAccount = summonerAccount
            usuario.summonerName = summonerName
            usuario.discord = discord

            usuario = await Usuario.findOneAndUpdate({ _id: req.params.id }, usuario, { new: true });
            res.json(usuario);
        }

    } catch (error) {
        console.log(error);
        res.status(500).send('ERROR');
    }
}

exports.mostrarUsuario = async (req, res) => {

    try {

        const usuario = await Usuario.findById(req.params.id);

        if (!usuario) {
            res.status(404).json({ msg: 'No existe un usuario' });
        } else {
            res.json(usuario);
        }

    } catch (error) {
        console.log(error);
        res.status(500).send('ERROR');
    }
}

exports.mostrarUsuarioPorPUUID = async (req, res) => {

    try {

        const usuario = await Usuario.findOne({summonerAccount:req.params.id});

        if (!usuario) {
            res.json({ msg: 'No existe un usuario' });
        } else {
            res.json(usuario);
        }

    } catch (error) {
        console.log(error);
        res.status(500).send('ERROR');
    }
}

exports.eliminarUsuario = async (req, res) => {

    try {

        const usuario = await Usuario.findById(req.params.id);

        if (!usuario) {
            res.status(404).json({ msg: 'No existe un usuario' });
        } else {
            await Usuario.findOneAndRemove({ _id: req.params.id });
            res.json({ msg: 'Usuario eliminado con exito' });
        }

    } catch (error) {
        console.log(error);
        res.status(500).send('ERROR');
    }
}

exports.login = async (req, res) => {

    try {

        const usuario = await Usuario.findOne({ email: req.body.email, password: req.body.password });

        if (!usuario) {
            res.status(404).json({ msg: 'No existe un usuario' });
        } else {
            jwt.sign({ usuario }, 'token', (err, token) => {
                res.json({ token: token });
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).send('ERROR');
    }

}

exports.verifyLogin = async (req, res) => {

    try {

        jwt.verify(req.body.token, 'token', (error, data) => {
            if (error) {
                res.json({'error':'not logged'});
            } else {
                res.json({
                    data: data
                })
            }
        })

    } catch (error) {
        console.log(error);
        res.status(500).send('ERROR');
    }

}