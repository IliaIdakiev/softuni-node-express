const express = require('express');
const port = 8080;
const api = require('./api');
const handlebars = require('express-handlebars');
const users = require('./users');

const app = express();

global.__projectdir = __dirname;

app.use(express.static(__dirname + '/public'));
app.engine('.hbs', handlebars({ extname: '.hbs' }))
app.set('views', __dirname + '/views');

function defaultHandler(req, res) {
  res.render('index.hbs', {
    title: 'Some title',
    body: 'TEST',
    users
  });
}

app.use((req, res, next) => {
  console.log('Time:', Date.now());
  next();
});

app.use('/api', api);

// app.get('/user/:id', (req, res) => {
//   const user = users.find(u => u.id === +req.params.id);
//   res.send(user || null);
// });

app.get('/', defaultHandler);

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send(err.message);
});

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});
