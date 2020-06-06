const functions = require('firebase-functions');
//to get data
const firebase = require('firebase-admin');
//using express
const express = require('express');
//using engine cosolidate
const engines = require('consolidate');

//instead of using long code to ini firebase, using
//the functions code to retrieve the configuration
const firebaseApp = firebase.initializeApp(
  functions.config().firebase
);

function getFacts() {
  const ref = firebaseApp.database().ref('facts');
  return ref.once('value').then(snap => snap.val());
}

//setting app to express
const app = express();
app.engine('hbs', engines.handlebars);
app.set('views', './views');
app.set('view engine', 'hbs');

//without cache, new timestamp sent every refresh instantly
app.get('/timestamp',(request, response) => {
  response.send(`${Date.now()}`);
});
//cached used to speed up time to reach server for "far" away users
//caution...timestamp will not change for duration
app.get('/timestamp-cached',(request, response) => {
  response.set('Cache-Control', 'public, max-age=300, s-maxage=600');
  response.send(`${Date.now()}`);
});

//load at index
app.get('/',(request, response) => {
  response.set('Cache-Control', 'public, max-age=300, s-maxage=600');
  //response.send(`${Date.now()}`);
  //reponse.render('index', { facts });
  getFacts().then(facts => {
    response.render('index', { facts });
  });
});
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.app = functions.https.onRequest(app);
