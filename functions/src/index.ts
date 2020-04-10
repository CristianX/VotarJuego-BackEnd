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

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
    // va con json para que regrese un archivo json
    response.json({
        mensaje: 'Hola mundo desde funciones de Firebase!!'
    });
 });
