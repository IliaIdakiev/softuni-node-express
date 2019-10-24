const router = require('express').Router();
const models = require('../models');
const auth = require('../modules/auth');

router.get('/', auth(), (req, res, next) => {
  models.User.find()
    .then(users => res.send(users))
    .catch(next);
});

router.get('/:id', auth(), (req, res, next) => {
  models.User.find({ _id: req.params.id })
    .then(users => res.send(users))
    .catch(next);
});

router.post('/', auth(), (req, res, next) => {
  const { email, firstName, lastName, password } = req.body;
  models.User.create({ email, firstName, lastName, password })
    .then((user) => res.send(user))
    .catch(next);
});

router.put('/', auth(true), (req, res, next) => {
  const { id, email, firstName, lastName, password } = req.body;
  models.User.updateOne({ _id: id }, { email, firstName, lastName, password })
    .then((user) => res.send(user))
    .catch(next);
});

router.delete('/:id', auth(true), (req, res, next) => {
  const id = req.params.id;
  models.User.deleteOne({ _id: id })
    .then(deletedUser => res.send(deletedUser))
    .catch(next);
})

module.exports = router;