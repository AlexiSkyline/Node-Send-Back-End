const Usuarios = require( '../models/Usuarios' );
const bcrypt = require( 'bcrypt' );
const { validationResult } = require( 'express-validator' );

exports.nuevoUsuario = async ( req, res ) => {

    const errores = validationResult( req );
    if( !errores.isEmpty() ) {
        return res.status( 400 ).json({ errores: errores.array() });
    }
    
    const { email, password } = req.body;

    let usuario = await Usuarios.findOne({ email });

    if( usuario ) {
        return res.status( 400 ).json({ msg: 'El usuario ya esta registrado' });
    }

    usuario = new Usuarios( req.body );

    const salt = await bcrypt.genSalt( 10 );
    usuario.password = await bcrypt.hash( password, salt );

    try {    
        usuario.save();
        res.json({ msg: 'Usuario Creado Correctamente' });
    } catch (error) {
        res.status(404).json({ msg: 'Error en el servidor' });
        console.log( error );
    }
}