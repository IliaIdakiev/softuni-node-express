const jwt = require('./jwt');
const appConfig = require('../app-config');
const models = require('../models');

function auth(redirectUnauthenticated = true) {
  return function (req, res, next) {
    const token = req.cookies[appConfig.authCookieName] || '';
    Promise.all([
      jwt.verifyToken(token),
      models.tokenBlacklistModel.findOne({ token })
    ]).then(([data, blacklistedToken]) => {
      if (blacklistedToken) { return Promise.reject(new Error('blacklisted token')); }
      models.userModel.findById(data.id).then(user => {
        req.user = user;
        next();
      });
    }).catch(err => {
      if (!redirectUnauthenticated) { next(); return; }
      if ([
        'token expired',
        'blacklisted token',
        'jwt must be provided'
      ].includes(err.message)
      ) {
        res.redirect('/login');
        return;
      }
      next(err);
    });
  };
}

module.exports = auth