const fs = require('fs');
const http = require('http');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method

    console.log(req.headers, req.url)
    if (url === '/') {
        res.write('<html>')
        res.write('<head><title>Empty Route</title></head>')
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button style="background-color: transparent; border-style:none" type="submit">Send</button></form></body>')
        res.write('</html>')
        return res.end();
    }

    if (url === '/message' && method === 'POST') {
        const body = []
        req.on('data', (chunk)=> {
            console.log(chunk);
            body.push(chunk);
        });
        req.on('end', () =>{
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            const message = parsedBody.split('=')[1];
            fs.writeFileSync('message.txt',  message)
        })
      
        res.statusCode = 302;
        res.setHeader('Location', '/')
        return res.end();
    }

    res.write('<html>')
    res.write('<head><title>Populated Route</title></head>')
    res.write('<body><h1>Hello World</h1></body>')
    res.write('</html>')
});

server.listen(3000);



//STREAMS
// when data is received, it arrives as a stream of data
// these streams are read as chunks.
// essentially these streams make up the request body.
// Each chunk makes up a part of the request body.

// BUFFERS
//Buffers allow us to organize the request body. 
//Essentially allowing us to hold multiple chunks and use them before they are destroyed.


// in the above code, line 18, we created a new const variable called 'body' this variable is defined as an empty array.
// we then use the req.on method, taking the body of our requests and store the respective chunks.
// when the the console.log function is called we can the an array (stream) of the chunks.
// we then use body.push, this assigned the chunk stream array value to the newly created body const variable 
// body now looks like this: <Buffer 6d 65 73 73 61 67 65 3d 74 65 73 74>
// we then have the end the lifecycle hook by calling req.on('end')
//here we create a new const variable 'parsedBody' and give it the value of the buffer concatenated(with the value previously returned as stored in body)
// the toString method is then used to convert that string of chunks into a string. 
//we then define of const message as the parsedBody, removing the '=' and getting the value in position 1.
// we then have to move the  fs.writeFileSync('message.txt',  message) into the event loop and define the content of the message.txt file to message.



