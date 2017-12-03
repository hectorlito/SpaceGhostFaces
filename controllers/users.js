const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
cosnt bcrypt = require('bcrypt');

router.get('/new', (req, res) => {
  res.render('users/new.ejs');
});

router.post('/', async (req, res) => {
  await User.create(req.body);
  res.redirect('/');
});

module.exports = router;
