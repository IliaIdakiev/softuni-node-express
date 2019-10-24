const db = require('./db');

db.then(() => {
  console.log('Connected to db successfully');
  require('./main');
})
