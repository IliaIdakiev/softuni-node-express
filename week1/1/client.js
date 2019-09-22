const https = require('https');

https.get('https://google.com/', function (res) {
  let result = '';
  // res.on('customEvent', console.log)
  // res.emit('customEvent', 'data');

  res.on('data', function (chunk) {
    result = result + chunk;
  });

  res.on('end', function () {
    console.log(result);
  });

});
