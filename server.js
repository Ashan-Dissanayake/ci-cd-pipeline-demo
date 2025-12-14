const http = require('http');
const client = require('prom-client');

// Create a Registry
const register = new client.Registry();
client.collectDefaultMetrics({ register });

// HTTP server
const server = http.createServer(async (req, res) => {
  if (req.url === '/metrics') {
    res.writeHead(200, { 'Content-Type': register.contentType });
    res.end(await register.metrics());
  } else if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World');
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
