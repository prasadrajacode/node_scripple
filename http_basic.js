const http = require("http");
const path = require("path");
const fs = require("fs");

// http.createServer((req,res)=> {
//    res.write('<h1>Hello World<h1>');
//    res.end();
// }).listen(8000,() => console.log('Server running....'));

const server = http.createServer((req, res) => {
    if (req.url === "/") {
      console.log(req.url);
      fs.readFile(path.join(__dirname, "public", "home.html"), (err, content) => {
        if (err) throw err;
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(content);
        res.end();
      });
    }
    if (req.url === "/about") {
      console.log(req.url);
      fs.readFile(
        path.join(__dirname, "public", "about.html"),
        (err, content) => {
          if (err) throw err;
          res.writeHead(200, { "Content-Type": "text/html" });
          res.write(content);
          res.end();
        }
      );
    }
    if (req.url === "/api/users") {
      console.log(req.url);
      const users = [
        { name: "Bob Smith", age: 40 },
        { name: "John Doe", age: 30 },
      ];
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(users));
    }
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
