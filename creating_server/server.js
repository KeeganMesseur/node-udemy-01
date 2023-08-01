const http = require('http');

const server = http.createServer((req, res) => {
    console.log(req)
});

server.listen(3000);

//npm i 
//node server 
//go to localhost:3000
//view logs in terminal 