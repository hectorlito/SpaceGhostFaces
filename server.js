const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const session = require('express-session');
const methodOverride = require('method-override');

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/auth';
mongoose.connect(mongoURI, { useMongoClient: true});
mongoose.Promise = global.Promise;


//test connection
const db = mongoose.connection;
db.on('error', (err) => console.log("mongo err", err.message));
db.on('connected', () => console.log('Mongo running: ', mongoURI));
db.on('disconnected', () => console.log("mongo not running"));

app.use(session({
  secret: 'feedmeseymour',
  resave: false,
  saveUninitialized: false
}));

// middleware
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static('public'));

//controllers
const usersController = require('./controllers/users.js');
app.use('/users', usersController);
const sessionsController = require('./controllers/sessions.js');
app.use('/sessions', sessionsController);

//ROUTES
// app.get('/', (req, res) => {
//   res.render('index.ejs');
// });


app.get('/', (req, res) => {
  res.render('index.ejs', {
      currentUser: req.session.currentuser
  });
});

app.get('/app',  (req, res) => {
if (req.session.currentuser) {
  res.send('space ghost faces');
} else {
  res.redirect('/sessions/new');
  }
});

app.listen(PORT, () => {
  console.log('==============');
console.log("Listening on port: ", PORT);
  console.log('==============');
});

module.exports = app;
