const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  chatId: {
    type: Number,
  },
  updated: { type: Date, default: Date.now },
})

const User = model('User', userSchema)
module.exports = User
