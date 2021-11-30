const express = require( 'express' );
const router = express.Router();
const usuarioController = require( '../controllers/usuarioController' );
const { check } = require( 'express-validator' );

router.post( '/',
    [
        check( 'nombre', 'El Nombre es Obligatorio' ).not().isEmpty(),
        check( 'emial', 'Agrega un email Valido' ).isEmail(),
        check( 'password', 'El password debe de ser al menos 6 caracteres' ).isLength({ min: 6 })
    ],
    usuarioController.nuevoUsuario
);

module.exports = router;