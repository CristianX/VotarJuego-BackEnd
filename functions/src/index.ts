import * as functions from 'firebase-functions';

// Firebase Admin para llamar la colección de la database
import * as admin from 'firebase-admin';

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
