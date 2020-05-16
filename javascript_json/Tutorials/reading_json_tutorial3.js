//Installed node.js onto mac os...
//Reading a JSON file was fullfilled with help
//from "8.5: Saving Data to JSON File with Node.js - Programming with Text"
//var fs = require('fs');
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
