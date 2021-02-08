const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
// set GOOGLE_APPLICATION_CREDENTIALS='C:\Coding\Full Stack\online-tutor'\to\online-tutor-app-c68ab-firebase-adminsdk-anbzy-1122809c6f.json

const express = require("express");
const cors = require('cors');
const app = express()

app.use(cors({ origin: true }))
// app.use(express.json())

app.post('/hello', (request, response) => {
  if(request.method=='POST'){
      response.status(200)
      .send("Hello from Firebase! " + request.body.name);  
    }
  })


// exports.addAdminRole = functions.https.onCall((data, context) => {
//   // get user and add admin custom claim
//   return admin.auth().getUserByEmail(data.email).then(user => {
//     return admin.auth().setCustomUserClaims(user.uid, {
//       admin: true
//     })
//   })
//   .then(() => {message: `Success! ${data.email} has been made an admin.`})
//   .catch(err => err);
// });

app.post('/addAdminRole', (request, response) => {
  const data = request.body;
  return admin.auth().getUserByEmail(data.email).then(user => {
    return admin.auth().setCustomUserClaims(user.uid, {
      admin: true
    })
  })
  .then(() => response.status(200).send({message: `Success! ${data.email} has been made an admin.`}))
  .catch(err => response.send(err.message));
  // response.status(200).send(`${data.email} is now an admin!`);
})


exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
  
  if(request.method=='GET'){
    response.send("Hello from Firebase! "+request.query.name);  
  }
    
});

exports.api = functions.https.onRequest(app)
