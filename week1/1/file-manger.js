const fs = require('fs');

function readUsers(cb) {
  return fs.readFile('users.txt', { encoding: 'utf-8' }, cb);
}

module.exports = {
  readUsers
};
