const express = require('express');
const users = require('./users');

const router = express.Router();


function getCurrentUsers(req, res, next) {
  // next(undefined); // continue to next handler
  setTimeout(function () {
    req.user = users[0];
    next();
  }, 500);
}

function auth(req, res, next) {
  next(!!req.user ? undefined : new Error('Not allowed!'));
}

router.get('/user', getCurrentUsers, auth, (req, res) => {
  res.send(users);
});

router.delete('/user/:id', (req, res) => {
  const { id } = req.params;
  const userIdx = users.findIndex(({ id: userId }) => userId === +id);
  users.splice(userIdx, 1);
  res.redirect('/');
});

router.post('/user', (req, res) => {
  console.log(req.body);
  res.send();
});

router.get('/user/:id', (req, res) => {
  res.send(users.find(u => u.id === +req.params.id));
});

module.exports = router;