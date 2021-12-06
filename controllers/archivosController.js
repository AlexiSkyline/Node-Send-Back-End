const multer = require( 'multer' );
const shortid = require( 'shortid' );
const fs = require( 'fs' );
const Enlaces = require( '../models/Enlace' );

exports.subirArchivo = async ( req, res, next ) => {
    const configuracionMulter = {
        limits : { fileSize : req.usuario ? 1024 * 1024 * 10 : 1024 * 1024 },
        storage: fileStorage = multer.diskStorage({
            destination: ( req, file, callBack ) => {
                callBack( null, __dirname+'/../uploads' );
            },
            filename: ( req, file, callBack ) => {
                const extension = file.originalname.substring( file.originalname.lastIndexOf('.'), file.originalname.length );
                callBack( null, `${shortid.generate()}${extension}` );
            }
        })
    }
    
    const upload = multer( configuracionMulter ).single( 'archivo' );

    upload( req, res, async ( error ) => {
        console.log( req.file );
        
        if( !error ) {
            res.json({ archivos: req.file.filename });
        } else {
            console.log( error );
        }
    });
}

exports.eliminarArchivo = async ( req, res ) => {
    try {
        fs.unlinkSync( __dirname + `/../uploads/${ req.archivo }` );
        console.log('Archivo Eliminado');
    } catch (error) {
        console.log(error);
    }
}

// Todo: Descarga un archivo
exports.descargar = async ( req, res, next ) => {
    // Todo: Obtenemos el enlace
    const { archivo } =  req.params;
    const enlace = await Enlaces.findOne({ nombre: archivo });

    const archivoDescarga= __dirname + '/../uploads/' + archivo;
    res.download( archivoDescarga );

    // Todo: Elimina el archivo y de la BD
    const { descargas, nombre } = enlace;

    if( descargas === 1 ) {
        // * Elimina el archivo
        req.archivo = nombre;

        // * Elimina el registro de la BD
        await Enlaces.findOneAndRemove( enlace.id );
        next();
    } else {
        enlace.descargas--;
        await enlace.save();
    }
}