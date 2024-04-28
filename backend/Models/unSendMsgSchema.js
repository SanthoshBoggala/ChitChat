const mongoose = require('mongoose')


const unsentMessageSchema = new mongoose.Schema({
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    msg: {
      type: String,
      required: true
    },
    time: {
      type: Date,
      default: Date.now()
    }
  })

  
  const UnsentMessage = mongoose.model('UnsentMessage', unsentMessageSchema)
  
  module.exports = UnsentMessage