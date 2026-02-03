const http = require('http');
const url = require('url');

function factorial(n) {
  let fact = 1;
  for (let i = 1; i <= n; i++) {
    fact *= i;
  }
  return fact;
}

const server = http.createServer((req, res) => {
  const query = url.parse(req.url, true).query;
  const num = Number(query.num);

  res.writeHead(200, { 'Content-Type': 'text/plain' });

  if (isNaN(num) || num < 0) {
    res.end('Please provide a valid non-negative number using ?num=');
  } else {
    res.end(`Factorial: ${factorial(num)}`);
  }
});

server.listen(3000);
