  //Include the Firebase Functions
const functions = require('firebase-functions');
  //Firebase Admin Package
const firebase = require('firebase-admin');
  //Including service account key file, not needed for cloud based app
//const serviceAccount = require('web-app-e8b75-firebase-adminsdk-tbm10-ae800dcd02.json")';
  //Using express framework
const express = require('express');
  //Using engine cosolidate
const engines = require('consolidate');

  //instead of using long code to ini firebase, using
  //the functions code to retrieve the configuration
  //because I am on firebase cloud
const firebaseApp = firebase.initializeApp(
  functions.config().firebase
);

  //for firestore
const db = firebase.firestore();

  //real time database code to retrieve data
function getFacts() {
  const ref = firebaseApp.database().ref('facts');
  return ref.once('value').then(snap => snap.val());
}

  //reference to database collection, firestore
const studentCollection = db.collection("students");

  //setting app to express
const app = express();

  //setting up index.hbs
app.engine('hbs', engines.handlebars);
app.set('views', './views');
app.set('view engine', 'hbs');

  //without cache, new timestamp sent every refresh instantly
//app.get('/timestamp',(request, response) => {
  //response.send(`${Date.now()}`);
//});

  //cached used to speed up time to reach server for "far" away users
  //caution...timestamp will not change for duration
//app.get('/timestamp-cached',(request, response) => {
  //response.set('Cache-Control', 'public, max-age=300, s-maxage=600');
  //response.send(`${Date.now()}`);
//});

app.get('/test',(request, response) => {
  response.render('index');
})

  //load at index url
app.get('/',(request, response) => {
  response.set('Cache-Control', 'public, max-age=300, s-maxage=600');
  //response.send(`${Date.now()}`);
  //reponse.render('index', { facts });

    //below is for real time database
  getFacts().then(facts => {
    response.render('index', { facts });
  });
});

exports.app = functions.https.onRequest(app);
