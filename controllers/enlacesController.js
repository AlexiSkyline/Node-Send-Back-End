const Enlaces = require( '../models/Enlace' );
const shortid = require( 'shortid' );
const bcrypt  = require( 'bcrypt' );

exports.nuevoEnlace = async ( req, res, next ) => {
    // Todo revisar si hay errores

    //Todo: Crea un nuevo Objeto de Enlace
    const { nombre_original } = req.body;
    const enlace = new Enlaces();
    enlace.url = shortid.generate();
    enlace.nombre = shortid.generate();
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