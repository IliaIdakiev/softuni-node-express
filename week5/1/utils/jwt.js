var jwt = require('jsonwebtoken');
const secret = 'shhhhh';

function createToken(data) {
  return jwt.sign(data, secret, { expiresIn: '10m' });
}

function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, data) => {
      if (err) { reject(err); return; }
      resolve(data);
    });
  });
}

module.exports = {
  createToken,
  verifyToken
}