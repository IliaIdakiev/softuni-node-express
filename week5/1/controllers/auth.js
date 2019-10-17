const models = require('../models');
const utils = require('../utils');
const appConfig = require('../app-config');
const { validationResult } = require('express-validator');

module.exports = {
  get: {
    login: function (req, res) {
      res.render('login.hbs');
    },
    register: function (req, res) {
      res.render('register.hbs');
    },
    logout: function (req, res) {
      const token = req.cookies[appConfig.authCookieName];
      models.tokenBlacklistModel.create({ token }).then(() => {
        res.clearCookie(appConfig.authCookieName).redirect('/');
      });
    }
  },
  post: {
    login: function (req, res, next) {
      const { username, password } = req.body;
      models.userModel.findOne({ username })
        .then(user => Promise.all([user, user ? user.matchPassword(password) : false]))
        .then(([user, match]) => {
          if (!match) {
            res.render('login.hbs', { massage: 'Wrong password or username!' });
            return;
          }
          const token = utils.jwt.createToken({ id: user._id });
          res.cookie(appConfig.authCookieName, token).redirect('/');
        });
    },
    register: function (req, res, next) {
      let result;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        result = Promise.reject({ name: 'ValidationError', errors: errors.errors });
      } else {
        result = models.userModel.create({ username, password });
      }

      const { username, password, repeatPassword, email } = req.body;

      return result.then(() => {
        res.redirect('/login');
      }).catch(err => {
        if (err.name === 'ValidationError') {
          res.render('register.hbs', {
            errors: err.errors
          });
          return;
        }
        next(err);
      });
    }
  }
};
