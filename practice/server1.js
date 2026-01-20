const http = require("http");

const server = http.createServer((req, res) => {
    if (req.url === '/home') {
        res.writeHead(200, { 
            "Content-Type": "text/html"
        });
        res.end("<h1>Home Page</h1>");
    } 
    else if (req.url === '/about') {
        res.writeHead(200,
             { "Content-Type": "text/html" 
             });
        res.end("<h1>About Page</h1>");
    } 
    else {
        res.writeHead(404, {
             "Content-Type": "text/html" 
            });
        res.end("<h1>404 Page Not Found</h1>");
    }
});

server.listen(5000, () => {
    console.log("Server is running on http://localhost:5000");
})


