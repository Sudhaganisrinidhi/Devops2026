const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  const query = url.parse(req.url, true).query;
  const num = Number(query.num);

  res.writeHead(200, { 'Content-Type': 'text/plain' });

  if (isNaN(num)) {
    res.end('Please provide a valid number using ?num=');
  } else if (num % 2 === 0) {
    res.end('Even Number');
  } else {
    res.end('Odd Number');
  }
});

server.listen(3000);
