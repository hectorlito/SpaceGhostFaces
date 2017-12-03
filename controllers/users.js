const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcrypt');

router.get('/new', (req, res) => {
  res.render('users/new.ejs');
});

// router.post('/register', async (req, res) => {
//   req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
//   await User.create(req.body);
//   res.redirect('/');
//
// });
// Register
router.post('/register', async (req, res, next) => {

  // Create Hash Password
  const password = req.body.password;
  const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const username = req.body.username;

  // Create an object for our db entry
  const userDbEntry = {};
  userDbEntry.username = username;
  userDbEntry.password = passwordHash;
  console.log(userDbEntry);


   try {
     const users = await User.find({username: req.body.username});
     if (users.length == 0) {
    const user = await User.create(userDbEntry);
    console.log(user);
    req.session.username = user.username;
    req.session.logged = true;
    res.redirect('/');

  } else {
    // req.session.message = "'Username taken'";
    res.send('Username taken');
  }
     console.log(user);
   } catch(err) {
     res.send('Failed to create user')
     console.log('Register Error: ', err);
   }
});




module.exports = router;
