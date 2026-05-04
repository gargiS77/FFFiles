const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Welcome to Raw HTTP Server</h1>');
  } 
  else if (req.method === 'GET' && req.url === '/json') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    let data = { date: new Date().toISOString() };
    res.end(JSON.stringify(data));
  } 
  else if (req.method === 'POST' && req.url === '/echo') {
    let body = '';
    
    // listen for data chunks
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      // echo the data back
      res.end(body);
    });
  } 
  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
