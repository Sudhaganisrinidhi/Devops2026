const path = require('path');

// Join path segments: '/users/docs/file.txt' (on POSIX)
const fullPath = path.join('/users', 'docs', 'file.txt');
console.log(`Joined path: ${fullPath}`);

// Get the file extension: '.txt'
const extension = path.extname(fullPath);
console.log(`Extension: ${extension}`);

// Get the file name: 'file.txt'
const filename = path.basename(fullPath);
console.log(`Filename: ${filename}`);

// Parse a path into an object: { root: '/', dir: '/users/docs', base: 'file.txt', ext: '.txt', name: 'file' }
const pathInfo = path.parse(fullPath);
console.log(`Parsed info:`, pathInfo);

// Resolve relative paths to an absolute path based on the current working directory
const resolvedPath = path.resolve('config', 'app.json');
console.log(`Resolved path: ${resolvedPath}`);
