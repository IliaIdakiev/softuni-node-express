const router = require('express').Router();
const models = require('../models');
const jwt = require('../modules/jwt');
const userRouter = require('./user');

router.post('/register', (req, res, next) => {
  const { email, firstName, lastName, password, isAdmin } = req.body;
  models.User.create({ email, firstName, lastName, password, isAdmin: isAdmin || false })
    .then((user) => res.send(user))
    .catch(next);
});

router.post('/login', (req, res, next) => {
  const { email, password } = req.body;
  models.User.findOne({ email }).then(user => {
    if (!user) { res.send({ error: '[NOT_FOUND]' }); return; }
    return Promise.all([user, jwt.create({ id: user._id })]);
  }).then(([user, token]) => {
    res.cookie('auth_cookie', token, { httpOnly: true });
    res.send({ user });
  }).catch(next);
});

router.get('/', (req, res) => {
  res.send('Hello World!');
});

router.use('/user', userRouter);
module.exports = router;