  //Include the Firebase Functions
const functions = require('firebase-functions');
  //Firebase Admin Package
const admin = require('firebase-admin');
  //Including service account key file
const serviceAccount = require('./web-app-e8b75-firebase-adminsdk-tbm10-ae800dcd02.json');
  //Using express framework (important)
const express = require('express');
  //Engine cosolidate, not being used for this attempt
//const engines = require('consolidate');
  //include morgan to log
const logger = require('morgan');
  //retrieve info from input
const bodyParser = require('body-parser');

const firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://web-app-e8b75.firebaseio.com'
})
functions.config().firebase;

//Firebase Database
const database = firebaseAdmin.database()

  //instead of using long code to initialize firebase, using
  //the functions code to retrieve the configuration
  //because I am using firebase cloud
//const firebaseApp = admin.initializeApp(
  //functions.config().firebase
//);

  //declare firestore
//const db = admin.firestore();

  //real time database code to retrieve data
  //temporarily not in use during this attempt
//function getFacts() {
  //const ref = firebaseApp.database().ref('facts');
  //return ref.once('value').then(snap => snap.val());
//}

  //example reference to database collection, firestore
//const studentCollection = db.collection("students");

  //Create instance of express app
const app = express();

  //want to use javascript and html
  //ejs = embedded javascript
app.set('view engine', 'ejs')

  //for css imagages and other static files
app.use(express.static('views'))
app.set('views', __dirname + '/views')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(logger('dev'))

  //Create auth middleware
function isAuthenticated(request, response, next){
    //check if user logged in
    //if yes, attatch to request object
    //otherwise display error to log in
}

app.get('/', function(request, response){
  //response.send("<h1>Hello World<h1>")
  var enginesRef = database.ref("/engines")

  enginesRef.once('value',function(snapshot){
    var data = snapshot.val()
    if (!data) {
      data = {}
    }
    response.render('home.ejs', {engines: snapshot.val()})
  })
})

app.get('/engine', isAuthenticated, function(request,response){
  response.render('engine.ejs')
})

app.post('/', function(request, response){
  const student = (request.body.student)
  response.render('results.ejs', {data: student})
})

  //setting up index.hbs, not in use during this attempt
//app.engine('hbs', engines.handlebars);
//app.set('views', './views');
//app.set('view engine', 'hbs');

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

  //segment for testing code...
//app.get('/test',(request, response) => {
  //response.render('index');
//})

  //load at index url, not in use during this attempt
//app.get('/',(request, response) => {
  //response.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    //response.send(`${Date.now()}`);
    //reponse.render('index', { facts });

    //below is for real time database
  //getFacts().then(facts => {
    //response.render('index', { facts });
  //});
//});

exports.app = functions.https.onRequest(app);
