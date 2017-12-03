const express= require('express');
const router = express.Router();
const User = require('../models/users.js');

router.get('/new', (req, res) => {
  res.render('sessions/new.ejs');
});

router.post('/', async (req, res) => {
  const foundUser = await User.findOne({ username: req.body.username});
  if (req.body.password == foundUser.password) {
    res.send('logged in');
  } else {
    res.send('wrong password');
  }
});

router.post('/', async (req, res) => {
  const foundUser = await User.findOne({ username: req.body.username});
  if ( req.body.password == foundUser.password) {
    req.session.currentuser = foundUser;
    res.redirect('/');
  } else {
    res.send('wrong password');
  }
});

router.delete('/', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});




module.exports = router;
