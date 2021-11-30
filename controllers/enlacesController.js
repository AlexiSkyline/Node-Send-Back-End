const Enlaces = require( '../models/Enlace' );
const shortid = require( 'shortid' );

exports.nuevoEnlace = async ( req, res, next ) => {
    // Todo revisar si hay errores

    //Todo: Crea un nuevo Objeto de Enlace
    const { nombre_original, password } = req.body;
    const enlace = new Enlaces();
    enlace.url = shortid.generate();
    enlace.nombre = shortid.generate();
    enlace.nombre_original = nombre_original;
    enlace.password = password;

    // * Almacena  en la DB
    try {
        await enlace.save();
        return res.json({ msg: `${ enlace.url }`});
        next();
    } catch (error) {
        console.log(error);
    }
}