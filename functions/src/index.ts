import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
    // va con json para que regrese un archivo json
    response.json({
        mensaje: 'Hola mundo desde funciones de Firebase!!'
    });
 });
