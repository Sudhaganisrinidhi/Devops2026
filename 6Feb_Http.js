// Import the built-in 'http' module
const http = require('http');

const hostname = '127.0.0.1'; // localhost
const port = 3000;

// Create an HTTP server instance
const server = http.createServer((req, res) => {
  // Set the response HTTP header with status code 200 (OK) and content type plain text
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  // Send the response body
  res.end('Hello World!\n');
});

// Start the server and listen on the specified port and hostname
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
