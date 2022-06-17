const Usuario = require("../models/Usuario");


exports.crearUsuario = async (req, res) => {
    
    try {
        
        let usuario;

        //Creamos nuestro usuario
        usuario = new Usuario(req.body);

        await usuario.save();
        res.send(usuario);

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

exports.actualizarUsuario = async (req, res) => {
    
    try {
        
        const { nombreCompleto,email,nombreUsuario,password,rol } = req.body;
        let usuario = await Usuario.findById(req.params.id);

        if(!usuario) {
            res.status(404).json({msg:'No existe un usuario'});
        }else{
            usuario.nombreCompleto = nombreCompleto;
            usuario.email = email;
            usuario.nombreUsuario = nombreUsuario;
            usuario.password = password;
            usuario.rol = rol;

            usuario = await Usuario.findOneAndUpdate({_id:req.params.id},usuario,{new:true});
            res.json(usuario);
        }

    } catch (error) {
        console.log(error);
        res.status(500).send('ERROR');
    }
}

exports.mostrarUsuario = async (req, res) => {
    
    try {
        
        let usuario = await Usuario.findById(req.params.id);

        if(!usuario) {
            res.status(404).json({msg:'No existe un usuario'});
        }else{
            res.json(usuario);
        }

    } catch (error) {
        console.log(error);
        res.status(500).send('ERROR');
    }
}

exports.eliminarUsuario = async (req, res) => {
    
    try {
        
        let usuario = await Usuario.findById(req.params.id);

        if(!usuario) {
            res.status(404).json({msg:'No existe un usuario'});
        }else{        
            await Usuario.findOneAndRemove({_id: req.params.id});
            res.json({msg: 'Usuario eliminado con exito'});
        }

    } catch (error) {
        console.log(error);
        res.status(500).send('ERROR');
    }
}