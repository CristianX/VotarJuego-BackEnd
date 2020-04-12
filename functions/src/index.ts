import * as functions from 'firebase-functions';

// Firebase Admin para llamar la colección de la database
import * as admin from 'firebase-admin';

// Express
import * as express from 'express';

// Cors
import * as cors from 'cors';

// Para el serviceAccount generar una nueva clave privada, el archivo descargado pegarlo en lib y en src
const serviceAccount = require("./serviceAccountKey.json");


// Inicialización de la aplicación; para ir a estas credenciales ir al engrane de información general, configuracion de proyecto y cuentas de servicio, elegir node.js
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://firestore-grafica-6feb1.firebaseio.com"

})


// Referencia a la base de datos
const db = admin.firestore();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
// Cloud function
export const helloWorld = functions.https.onRequest((request, response) => {
    // va con json para que regrese un archivo json
    response.json({
        mensaje: 'Hola mundo desde funciones de Firebase!!'
    });
 });

 // Cloud function; asyng por que el docsSnap es asíncrono
export const getGOTY = functions.https.onRequest( async (request, response) => {
    // const nombre = request.query.nombre || 'Sin nombre';
    
    // Referencia al nobo principal de la db
    const gotyRef = db.collection('goty');

    // Snapshot (no tiempo real)  de la bd; necesita el await por que es asíncrono
    const docsSnap = await gotyRef.get();

    // Llamando data
    const juegos = docsSnap.docs.map( doc => doc.data() );

    // Obteniendo datos de la posición 0 de la data de la db
    //response.json( docsSnap.docs[0].data() );

    // Llamando juegos
    response.json( juegos );

 });

 // Servidor Express (GET)
 const app = express();
 app.use( cors({ origin: true }) );

 app.get('/goty', async (req, res) => {
      // Referencia al nobo principal de la db
    const gotyRef = db.collection('goty');

    // Snapshot (no tiempo real)  de la bd; necesita el await por que es asíncrono
    const docsSnap = await gotyRef.get();

    // Llamando data
    const juegos = docsSnap.docs.map( doc => doc.data() );

    // Obteniendo datos de la posición 0 de la data de la db
    //response.json( docsSnap.docs[0].data() );

    // Llamando juegos
    res.json( juegos );
 });

 // Servidor Express POST
 app.post('/goty/:id', async (req, res) => {
     // Extrayendo id
     const id = req.params.id;

     // Referencia al documento que tenga ese id y saber si existe o no
     const gameRef = db.collection('goty').doc( id );
     // Snapshot (no tiempo real)  de la bd; necesita el await por que es asíncrono
     const gameSnap = await gameRef.get();

     if ( !gameSnap.exists ) {
         // Estatus con error 404 pero con mensaje personalizado
         res.status(404).json({
             ok: false,
             mensaje: 'No existe un juego con ese ID ' + id
         })
     } else {
         //res.json('Juego existe');
         
         // Referencia al objeto como estaba antes
         const antes = gameSnap.data() || { votos: 0 };
         await gameRef.update({
             votos: antes.votos + 1
         });

         res.json({
             ok: true,
             mensaje: `Gracias por tu voto ${ antes.name }`
         });
     }
 });



 // Todos los servicios van dento de app
 export const api = functions.https.onRequest( app );

