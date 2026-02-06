const { URL } = require('url'); // In Node.js, require the 'url' module
// In browsers, URL is a global object, no require needed

const myURL = new URL('https://user:pass@example.com:8080/p/a/t/h?query=string#hash');

console.log(myURL.href);      // 'https://user:pass@example.com:8080/p/a/t/h?query=string#hash'
console.log(myURL.protocol);  // 'https:'
console.log(myURL.host);      // 'example.com:8080'
console.log(myURL.hostname);  // 'example.com'
console.log(myURL.port);      // '8080'
console.log(myURL.pathname);  // '/p/a/t/h'
console.log(myURL.search);    // '?query=string'
console.log(myURL.hash);      // '#hash'
console.log(myURL.origin);    // 'https://example.com:8080' (read-only)
