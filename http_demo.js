const http = require("http");
const path = require("path");
const fs = require("fs");

// http.createServer((req,res)=> {
//    res.write('<h1>Hello World<h1>');
//    res.end();
// }).listen(8000,() => console.log('Server running....'));

const server = http.createServer((req, res) => {
  //   if (req.url === "/") {
  //     console.log(req.url);
  //     fs.readFile(path.join(__dirname, "public", "home.html"), (err, content) => {
  //       if (err) throw err;
  //       res.writeHead(200, { "Content-Type": "text/html" });
  //       res.write(content);
  //       res.end();
  //     });
  //   }
  //   if (req.url === "/about") {
  //     console.log(req.url);
  //     fs.readFile(
  //       path.join(__dirname, "public", "about.html"),
  //       (err, content) => {
  //         if (err) throw err;
  //         res.writeHead(200, { "Content-Type": "text/html" });
  //         res.write(content);
  //         res.end();
  //       }
  //     );
  //   }
  //   if (req.url === "/api/users") {
  //     console.log(req.url);
  //     const users = [
  //       { name: "Bob Smith", age: 40 },
  //       { name: "John Doe", age: 30 },
  //     ];
  //     res.writeHead(200, { "Content-Type": "application/json" });
  //     res.end(JSON.stringify(users));
  //   }

  let filePath = path.join(
    __dirname,
    "public",
    req.url == "/" ? "home.html" : req.url
  );
  console.log(filePath);

  // Extension of file
  let extname = path.extname(filePath);
  // Initial content type
  let contentType = "text/html";
  // Check ext and set content type
  switch (extname) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
  }

  // Check if contentType is text/html but no .html file extension
  if (contentType == "text/html" && extname == "") filePath += ".html";

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code == "ENOENT") {
        // Page not found
        fs.readFile(
            path.join(__dirname, "public", "404.html"),
            (err, content) => {
              res.writeHead(404, { "Content-Type": "text/html" });
              res.end(content, "utf8");
            }
          );
        console.log(err.code);
      } else {
        console.log("some server error");
        res.writeHead(500, { "Content-Type": "text/html" });
        res.write("some server error");
        res.end();
      }
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.write(content,'utf8');
      res.end();
    }
  });
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
