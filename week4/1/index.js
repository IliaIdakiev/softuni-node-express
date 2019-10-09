const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const options = { expiresIn: '2d' };
const secret = 'MySuperPrivateSecret';

const app = express();

function auth(authLevel) {
  return (req, res, next) => {
    const token = req.cookies['auth_cookie'];
    // const authUser = users.find(user => user.id === req.session.userId);
    const data = jwt.verify(token, secret);
    const authUser = users.find(user => user.id === data.userId);
    if (!authUser) {
      res.status(401).send('401');
      return;
    }
    req.user = authUser;
    next();
  }
}


// const p = new Promise((resolve, reject) => {
//   setTimeout(() => resolve(10), 1000);
// })



// p.then(number => {
//   const p2 = new Promise((resolve, reject) => {
//     setTimeout(() => resolve(10), 1000);
//   })
//   return Promise.all([number, p2]);
// }).then(([r1, r2]) => {

// });

app.use(session(
  { secret: 'my secret' },
  { httpOnly: true },
  { secure: false }
));

let users = [{
  id: 1,
  username: 'user1',
  password: '123',
  authLevel: 4
}];

app.use(cookieParser());
app.use(bodyParser.urlencoded());

app.get('/protected', auth(4), (req, res) => {
  res.send('This is protected');
});

app.get('/logout', (req, res) => {

  // blacklist database table for all tokens that haven't expired

  res.clearCookie('auth_cookie').redirect('/'); // clear the auth_cookie that contains the JWT
  // (1) express-session
  // req.session.destroy((err) => {
  //   if (err) {
  //     console.error(err);
  //     res.status(500).send(err.message);
  //     return;
  //   }
  //   res.redirect('/');
  // });
});

app.get('/register', (req, res) => {
  res.sendFile(path.resolve('pages', 'register.html'));
});

app.post('/register', (req, res, next) => {
  const { username, password } = req.body;
  const user = users.find(user => user.username === username);
  if (user) {
    res.sendFile(path.resolve('pages', 'register.html')); // TODO: present error to the user
    return;
  }
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) { next(err); return; }
    users = users.concat({ id: 2, username, password: hash });
    res.redirect('/');  // TODO: present success message to the user
  });
});

app.get('/login', (req, res) => {
  res.sendFile(path.resolve('pages', 'login.html'));
});

app.post('/login', (req, res, next) => {
  const authUser = users.find(user => user.username === req.body.username);
  if (!authUser) {
    res.sendFile(path.resolve('pages', 'login.html'));  // TODO: present error to the user
    return;
  }
  bcrypt.compare(req.body.password, authUser.password).then(result => {
    if (!result) {
      res.sendFile(path.resolve('pages', 'login.html'));  // TODO: present error to the user
      return;
    }
    const token = jwt.sign({ userId: authUser.id }, secret, options);
    // req.session.userId = authUser.id; (1) express-session
    res.cookie('auth_cookie', token).redirect('/'); // create a custom cookie that will store the JWT
  }).catch(next);
});

app.get('/', (req, res) => {
  res.send('Default page');
  // res.cookie('test_cookie', { test: 123 }).send('HELLO!'); 
  // create a custom cookie that will be sent to the browser
  // res.locals <- storing data for future handlers (useful inside a middleware)
});

app.listen(8080, () => {
  console.log('Server is listening on 8080');
});