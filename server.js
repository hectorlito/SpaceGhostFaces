const express = require('express');
const app = express();
const PORT = 3000;
const mongoose = require('mongoose');
const session = require('express-session');
const methodOverride = require('method-override');

const mongoURI = 'mongodb://localhost:27071/auth';
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

//controllers
const usersController = require('./controllers/users.js');
app.use('/users', usersController);
const sessionsController = require('./controllers/sessions.js');
app.use('/sessions', sessionsController);

//ROUTES
app.get('/', (req, res) => {
  res.render('index.ejs');
});


app.get('/', (req, res) => {
  res.render('index.ejs', {
      currentUser: req.session.currentuser
  });
});

app.listen(PORT, () => {
  console.log('==============');
console.log("Listening on port: ", PORT);
  console.log('==============');
});

module.exports = app;
