//Creating node.js Server was fullfilled with assistance
//from "Your First Node.js Web Server"
const http = require('http')
//Include another library fs
const fs = require('fs')
const port = 3000

const server = http.createServer(function(req, res) {
  res.writeHead(200, { 'Content-Type' : 'text/html' })
  fs.readFile('index.html', function(error,data){
    if (error) {
      res.writeHead(404)
      res.write('Error: File Not Found')
    } else {
      res.write(data)
    }
    res.end()
  })
  //res.write('Hello Node')
  //res.end()
})

server.listen(port, function(error) {
  if (error) {
    console.log('something went wrong', error)
  } else {
    console.log('Server is listneing to port ' + port)
  }
})
