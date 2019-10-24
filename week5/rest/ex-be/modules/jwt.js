const jwt = require('jsonwebtoken');

module.exports = {
  create: function (data) {
    return new Promise((resolve, reject) =>
      jwt.sign(data, '321321', { expiresIn: '1h' }, (err, token) => {
        if (err) { reject(err); return; }
        resolve(token);
      }));
  },
  verify: function (token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, '321321', (err, data) => {
        if (err) { reject(err); return; }
        resolve(data);
      });
    });
  }
};