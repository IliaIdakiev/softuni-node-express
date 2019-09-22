const http = require('http');
const fs = require('fs');
const port = 8080;

const app = http.createServer(function (req, res) {
  const stream = fs.createReadStream('./test.txt', { encoding: 'utf-8' });
  stream.on('data', function (chunk) {
    console.log(chunk);
    console.log('------');
  });
  stream.on('error', function (err) {
    console.error(err);
  });
  stream.pipe(res);
  // fs.readFile('./text.txt', function (err, content) {
  //   res.write(content);
  // });
});

app.listen(port, function () {
  console.log(`Server is listening on ${port}`)
});
