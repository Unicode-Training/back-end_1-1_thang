const http = require("http");
const url = require("url");
const server = http.createServer((req, res) => {
  //url --> pathname
  //headers
  //method
  //body
  const urlParsed = url.parse(req.url, true);
  const pathname = urlParsed.pathname;
  if (pathname === "/redirect") {
    res.setHeader("Location", "https://google.com");
    res.statusCode = 301;
    res.end();
  }
  //   console.log(pathname);
  //   console.log(req.method);
  //   console.log(req.headers["x-api-key"]);
  //   console.log(req.headers["cookie"]);

  //   //Response
  //   res.setHeader("Content-Type", "application/json;charset=utf-8");
  //   res.statusCode = 404;
  //   res.setHeader("Set-Cookie", "token=ahihi;path=/;max-age=3600;httpOnly");
  res.write(
    JSON.stringify({
      name: "Hoàng An",
    }),
  );
  res.end();
});

server.listen(3000, () => {
  console.log(`Đang chạy với port 3000`);
});
