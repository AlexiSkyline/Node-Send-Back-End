const multer = require( 'multer' );
const shortid = require( 'shortid' );

const configuracionMulter = {
    limits: { fileSize : 1000000 },
    storage: fileStorage = multer.diskStorage({
        destination: ( req, file, callback ) => {
            callback( null, __dirname + '/../uploads' );
        },
        filename:  ( req, file, callback ) => {
            const extension = file.mimetype.split( '/' )[1];
            callback( null, `${ shortid.generate() }.${ extension }` );
        },
    })
}

const upload = multer( configuracionMulter ).single( 'archivo' );

exports.subirArchivo = async ( req, res, next ) => {
    
}

exports.eliminarArchivo = async ( req, res ) => {

}