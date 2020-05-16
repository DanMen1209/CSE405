//Installed node.js onto mac os, run via "node app.js" terminal
var fs = require('fs');
var data = fs.readFileSync('passwords.JSON');
var passwords = JSON.parse(data);
console.log(passwords);

//passwords.json explained
//First column gives the password
//Second column tells us how likely it is
//to be used on a 1-10 scale with
//10 being the most likely and 1 the least
//To keep things simple, I will pre-populate
//with ten passwords.

//Include Express, a Node web framework
//to use express on mac os had to "npm install express"
//through terminal
var express = require('express');
var app = express();

//Creating server on port 3000 ex. localhost:3000
var server = app.listen(3000, listening);

function listening() {
  console.log("listening. . .");
}

//Using express for my server with assistance
//from "8.2: HTTP Server with Express-Programming with Text"
//Directing the index in directory "website"
app.use(express.static('website'));

app.get('/add/:word/:score?', addWord);

function addWord(request, response) {
  var data = request.params;
  var word = data.word;
  var score = Number(data.score);
  var reply;
  if (!score) {
    reply = {
      msg: "Score is required."
    }
  } else {
    passwords[word] = score;
    var data =  JSON.stringify(passwords, null, 2);
    fs.writeFile('passwords.json', data, finished);

    function finished(err) {
      console.log('all set.');
      reply = {
        word: word,
        score: score,
        status: "success"
        //msg: "Thank you for your word."
      }
      response.send(reply);
    }
  }
}
