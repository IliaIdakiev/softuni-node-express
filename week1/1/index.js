const _ = require('lodash');
const fileManager = require('./file-manger');
const a = require('./dir');

// CPS
fileManager.readUsers(function (err, content) {
  if (err) { console.error(err); return; }
  const userArray = content.split(',');
  console.log(_.chunk(userArray, 2));
});
