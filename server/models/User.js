const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  user_id:{
    type: Number,
    unique: true,
    required:[true,"Please enter user id"],
  },
  username: {
    type: String,
    trim: true,
    required: [true, 'Please enter username'],
    unique: [true, 'username already exists']
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Duplicate Email Not allowed"],
    trim: true,
    validate: function(value) {
      var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      return emailRegex.test(value);
    }
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;