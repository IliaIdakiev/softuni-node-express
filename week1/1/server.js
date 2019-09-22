const http = require('http');
const url = require('url');
const port = 8080;

const arr = [1, 2, 3];

const app = http.createServer(function (req, res) {
  // console.log(req.headers);
  // res.write('Hello');
  // setTimeout(function () {
  //   res.write(' ');
  //   res.end('World!');
  // }, 10000)
  // const user = { firstName: undefined, obj: { prop1: 1 } };

  // const { firstName: name = 'TEST', obj: { prop1 } } = user;

  // console.log(name);

  // destructuring
  const { pathname } = url.parse(req['url']);
  // same as 
  // const pathname = url.parse(req['url']).pathname;

  if (pathname === '/') {
    res.writeHead(200, { // Response Status Code
      'Content-Type': 'application/json'
    });
    res.end(JSON.stringify(arr));
    return;
  }
  if (pathname === '/about') {
    res.end('About');
    return;
  }
});

app.listen(port, function () {
  console.log(`Server is listening on ${port}`)
});
