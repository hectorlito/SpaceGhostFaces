const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
  username: String,
  name: String,
  password: String,
  img     : String,
  bio : String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
