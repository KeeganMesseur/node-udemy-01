const fs = require('fs');
const http = require('http');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/api/messages' && method === 'GET') {
        fs.readFile('messages.json', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error reading file');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(data);
        });
        return;
    }

    // We created an api api above defining the url /api/messages - to trigger this api we will start the server and execute http://localhost:3000/api/messages
    // We then define the method of the request as a GET.
    // If these two conditions are might, (url matches and method is get)

    

    if (url === '/api/messages' && method === 'POST') {
        const body = [];
        req.on('data', chunk => {
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const messageObj = JSON.parse(parsedBody);
            fs.readFile('messages.json', (err, data) => {
                let messages = [];
                if (!err && data.length > 0) {
                    messages = JSON.parse(data);
                }
                messages.push(messageObj);
                fs.writeFile('messages.json', JSON.stringify(messages), err => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end('Error writing file');
                        return;
                    }
                    res.writeHead(201, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ status: 'Message added!' }));
                });
            });
        });
        return;
    }

    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
});

server.listen(3000);
