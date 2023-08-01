const http = require('http');

const server = http.createServer((req, res) => {

    console.log(req.url, req.method, req.headers)
    res.setHeader('Content-Type', 'text/html')
    res.write('<html>')
    res.write('<head>First response</head>')
    res.write('<html>')
    res.end();
});

server.listen(3000);

