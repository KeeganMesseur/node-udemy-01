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
        fs.writeFileSync('message.txt', 'test text')
        res.statusCode = 302;
        res.setHeader('Location', '/')
        return res.end();
    }

    res.write('<html>')
    res.write('<head><title>Populated Route</title></head>')
    res.write('<body><h1>Hello World</h1></body>')
    res.write('</html>')
});

server.listen(3002);

// Here we have an a second if statement 
// we check if the server is at url "/message" and whether the corresponding request method is a POST method
// if both of these conditions are true; we will exacute the fs.writeFileSync method which will create a file on the server called message.txt with the text 'test text' inside.
// additionally if the url is populated we navigate to the hello world html section