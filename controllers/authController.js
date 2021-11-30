const Usuarios = require( '../models/Usuarios' );
const bcrypt = require( 'bcrypt' );
const jwt = require( 'jsonwebtoken' );
require( 'dotenv' ).config({ path: 'variables.env' });
const { validationResult } = require( 'express-validator' );

exports.autenticarUsuario = async ( req, res, next ) => {
    // Todo revisa los errores de Express validator
    const errores = validationResult( req );
    if( !errores.isEmpty() ) {
        return res.status( 400 ).json({ errores: errores.array() });
    }

    // Todo: Busca el usuario para ver si esta resgitrado
    const { email, password } = req.body;
    const usuario = await Usuarios.findOne({ email });

    if( !usuario ) {
        res.status( 401 ).json({ msg: 'El usuario No Existe' });
        return next();
    }

    // Todo: Verifica el password y autentica el usuario
    if( bcrypt.compareSync( password, usuario.password ) ) {
        const token = jwt.sign({
            id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email
        }, process.env.SECRETA, {
            expiresIn: '8h'
        });

        res.json({ token });
    } else {
        res.status( 401 ).json({ msg: 'Password Incorrecto' });
        return next();
    }
};

exports.usuarioAutenticado = async ( req, res, next ) => {
   
    
}