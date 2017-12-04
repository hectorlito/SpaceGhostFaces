const express= require('express');
const router = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcrypt');

router.get('/new', (req, res) => {
  res.render('sessions/new.ejs');
});

//login
router.post('/login', async (req, res) => {
  const foundUser = await User.findOne({ username: req.body.username});
  if ( bcrypt.compareSync(req.body.password, foundUser.password)) {
    req.session.currentuser = foundUser;
    res.redirect('/sessions/profile/' + foundUser._id);
  } else {
    res.send('wrong password');
  }
});
//specific id
router.get('/profile/:id', async (req, res) => {
  try{
  const foundId = await User.findOne({ _id: req.params.id});
  res.render('./sessions/profile.ejs', {foundId});
} catch(err) {
  res.send(err.message);
}
});

//path to edit page
router.get('/profile/edit/:id', async (req, res) => {
  const foundId = await User.findOne({ _id: req.params.id})
  console.log("working");
  res.render('./sessions/edit.ejs', {foundId})
});

//path back from edit to database--redirect to profile page
router.put('/profile/edit/:id', async (req, res) => {
const foundId = await User.findByIdAndUpdate(req.params.id, req.body)
console.log(req.body);
res.redirect('/sessions/profile/' + req.params.id)
// res.send('put route working')
})


router.delete('/', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});





module.exports = router;
