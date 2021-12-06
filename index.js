const express = require( 'express' );
const conectarDB = require( './config/db' );
const cors = require( 'cors' );

// Todo: crear el servidor
const app = express();

// Todo: Conextar a la base de datos
conectarDB();

// Todo: Habilitando Cors
const opcionesCors = {
    origin: process.env.FRONTEND_URL
}

app.use( cors( opcionesCors ) );

console.log( 'Comenzando Node Send' );

// * Puertos de la app
const port = process.env.PORT || 4000;

// Todo: Habilitar leer los valores de un Body
app.use( express.json() );

// Todo: Habilitar carpeta publica
app.use( express.static( 'uploads' ) );

// *Rutas de la APP
app.use( '/api/usuarios', require( './routes/usuarios' ) );
app.use( '/api/auth', require( './routes/auth' ) );
app.use( '/api/enlaces', require( './routes/enlaces' ) );
app.use( '/api/archivos', require( './routes/archivos' ) );

// Todo: Arranca la app
app.listen( port, () => {
    console.log( `El servidor esta funcionando en el puerto ${ port }` );
});