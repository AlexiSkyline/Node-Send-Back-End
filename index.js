const express = require( 'express' );

const app = express();

console.log( 'Comenzando Node Send' );

const port = process.env.PORT || 4000;

app.listen( port, () => {
    console.log( `El servidor esta funcionando en el puerto ${ port }` );
});