const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const logData = `${new Date().toISOString()} URL: ${req.url}\n`;
  fs.appendFile('log.txt', logData, (err) => {
    if (err) {
      console.error('Error writing log file');
    }
  });

  res.writeHead(200, { 'Content-Type': 'text/html' });

  if (req.url === '/login') {
    res.write('<h1>Login Page</h1>');
    res.write('<p>Welcome to Login Page</p>');
  }
  else if (req.url === '/about') {
    res.write('<h1>About Page</h1>');
    res.write('<p>This is About Page</p>');
  }
  else if (req.url === '/') {
    res.write('<h1>Home Page</h1>');
    res.write('<p>Welcome to Home Page</p>');
  }
  else {
    res.write('<h1>404 - Page Not Found</h1>');
  }

  res.end();
});
server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
