const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  const query = url.parse(req.url, true).query;
  const a = Number(query.a);
  const b = Number(query.b);

  res.writeHead(200, { 'Content-Type': 'text/plain' });

  if (isNaN(a) || isNaN(b)) {
    res.end('Please provide numbers using ?a=&b=');
  } else {
    res.end(
      `Add: ${a + b}\n` +
      `Sub: ${a - b}\n` +
      `Mul: ${a * b}\n` +
      `Div: ${a / b}`
    );
  }
});

server.listen(3000);
