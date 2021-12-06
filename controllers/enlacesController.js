const Enlaces = require( '../models/Enlace' );
const shortid = require( 'shortid' );
const bcrypt  = require( 'bcrypt' );
const { validationResult } = require( 'express-validator' );

exports.nuevoEnlace = async ( req, res, next ) => {
    // Todo revisar si hay errores
    const errores = validationResult( req );
    if( !errores.isEmpty() ) {
        return res.status( 400 ).json({ errores: errores.array() });
    }

    //Todo: Crea un nuevo Objeto de Enlace
    const { nombre_original, nombre } = req.body;
    const enlace = new Enlaces();
    enlace.url = shortid.generate();
    enlace.nombre = nombre;
    enlace.nombre_original = nombre_original;

    if( req.usuario ) {
        const { password, descargas } = req.body;

        enlace.descargas = ( descargas ) ? descargas: 1;

        const salt = await bcrypt.genSalt( 10 );
        enlace.password = ( password ) ? await bcrypt.hash( password, salt ) : null;

        enlace.autor = req.usuario.id
    }

    // * Almacena  en la DB
    try {
        await enlace.save();
        return res.json({ msg: `${ enlace.url }`});
    } catch (error) {
        console.log(error);
    }
}

// Todo: Listado de  todos los enlaces
exports.todosEnlaces = async ( req, res ) => {
    try {
        const enlaces = await Enlaces.find({}).select( 'url -_id' );
        res.json({ enlaces });
    } catch (error) {
        console.log( error );
    }
}

// Todo: Obtener el enlace
exports.obtenerEnlace = async ( req, res, next ) => {
    const { url } = req.params;
    
    const enlace = await Enlaces.findOne({ url });

    if( !enlace ) {
        res.status( 404 ).json({ msg: 'Ese enlace no existe' });
        return next();
    }

    // * Si el enlace exite
    res.json({ archivo: enlace.nombre }); 

    next();
}