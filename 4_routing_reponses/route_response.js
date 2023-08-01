const http = require('http');

const server = http.createServer((req, res) => {
    const url = req.url;
    console.log(req.url, req.method, req.headers)
    if (url === '/') {
        res.write('<html>')
        res.write('<head><title>This Is A Routed Request</title></head>')
        res.write('<body><h1>Enter Message</h1></body>')
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>')
        res.write('</html>')
        return res.end();
    }
    res.write('<html>')
    res.write('<head><title>My First Page</title></head>')
    res.write('<body><h1>Hello World</h1></body>')
    res.write('</html>')
});

server.listen(3111);

// Creates server 
// Defines server at 3111.
// When server starts we fo an if to see if we at an empty rout "/" if we we are, we'll trigger the html containing the input.
// when we fill out the input and trigger it we will exaction the action of routing to the "/message" url. We also define the request method of this action as a 'post'.
// if the route however is not empty "/notempty.