const express= require('express');
const router = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcrypt');

router.get('/new', (req, res) => {
  res.render('sessions/new.ejs');
});
router.get('/profile', (req, res) => {
  res.render('sessions/profile.ejs');
});

router.post('/login', async (req, res) => {
  const foundUser = await User.findOne({ username: req.body.username});
  if ( bcrypt.compareSync(req.body.password, foundUser.password)) {
    req.session.currentuser = foundUser;
    res.redirect('/profile.ejs');
  } else {
    res.send('wrong password');
  }
});



router.delete('/', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});





module.exports = router;
