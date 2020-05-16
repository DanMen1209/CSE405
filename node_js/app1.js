//based off: #1.4 Node.js Hello World Example. Create first application in Node

//constant variable and require function
//reuire to include library http
const http = require('http');

//built in module from Node
//using createserver function belongs to http library
//accets one paramter, it is a function without a name
//req = request object, can be req or request (argument)
//res is the reposnse object can be named to any desired name
//if change name the res in the body must also be reponse ex. response.end...
const server = http.createServer((req, res) => {
  res.end('Hello World\n');
});

//to activate server funciotn listen function
//can change port number 4242 to anything ex. 9000
//second argument is a function with no parameter just contains body
//this body prints out the string
server.listen(4242, () => {
  console.log('Server is running...');
});
