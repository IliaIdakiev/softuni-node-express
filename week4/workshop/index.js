

global.__basedir = __dirname;
const dbConnector = require('./config/db');
// const mongoose = require('mongoose');
dbConnector().then(() => {

  // const studentSchema = new mongoose.Schema({
  //   name: String,
  //   teacher: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'Teacher'
  //   },
  //   subjects: [{
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'Subject'
  //   }]
  // });

  // const subjectSchema = new mongoose.Schema({
  //   title: String,
  //   students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }]
  // });

  // const teacherSchema = new mongoose.Schema({
  //   name: String,
  //   students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }]
  // });

  // const StudentModel = mongoose.model('Student', studentSchema);
  // const SubjectModel = mongoose.model('Subject', subjectSchema);
  // const TeacherModel = mongoose.model('Teacher', teacherSchema);

  // TeacherModel.insertMany([{ name: 'Teacher 1', students: [] }]).then(() => {
  //   console.log('teacher was added');
  // });

  // StudentModel.insertMany([{ name: 'Student 1', teacher: '5d939236ac443820c616c12f' }]).then(() => {
  //   console.log('students was added!');
  // });

  // StudentModel.findById('5d9392c275a0af22c6089016').populate('teacher').then(stud => {
  //   console.log(stud);
  // })

  const config = require('./config/config');
  const app = require('express')();
  require('./config/express')(app);
  require('./config/routes')(app);
  app.use(function (err, req, res, next) {
    console.error(err);
    res.render('500.hbs', { errorMessage: err.message });
  });

  app.listen(config.port, console.log(`Listening on port ${config.port}!`));
}).catch(console.error);





// const dbUrl = 'mongodb://localhost:27017';
// const { MongoClient } = require('mongodb');
// const client = new MongoClient(dbUrl);

// client.connect(function (err, client) {
//   if (err) { console.error(err); return; }
//   const db = client.db('testdb');
//   const users = db.collection('users');

//   users.insert({ name: 'test' }).then(qr => {
//     console.log(qr);
//     users.deleteMany({ name: 'test ' }).then(qr => {
//       console.log(qr);
//     });
//   });
// });
