const express = require( 'express' );
const conectarDB = require( './config/db' );

// Todo: crear el servidor
const app = express();

// Todo: Conextar a la base de datos
conectarDB();

console.log( 'Comenzando Node Send' );

// * Puertos de la app
const port = process.env.PORT || 4000;

// *Rutas de la APP
app.use( '/api/usuarios', require( './routes/usuarios' ) );

// Todo: Arranca la app
app.listen( port, () => {
    console.log( `El servidor esta funcionando en el puerto ${ port }` );
});