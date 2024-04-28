const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  num: {
    type: String,
    unique: true
  },
  pass: {
    type: String,
  }
})

const User = mongoose.model('User', userSchema)


module.exports = User
