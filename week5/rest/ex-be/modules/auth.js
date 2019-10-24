const jwt = require('./jwt');
const models = require('../models');

module.exports = function (adminOnly = false) {
  return function (req, res, next) {
    const token = req.cookies['auth_cookie'];
    jwt.verify(token)
      .then(({ id }) => models.User.findById(id))
      .then(user => {
        if (!user || (adminOnly && !user.isAdmin)) {
          return Promise.reject();
        }
        req.user = user; next();
      })
      .catch(() => {
        res.status(401).send('[UNAUTHORIZED]');
      });
  }
}