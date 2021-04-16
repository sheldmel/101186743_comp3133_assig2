const mongoose = require('mongoose');

const HotelSchema = new mongoose.Schema({
  hotel_id:{
    type: Number,
    unique: [true, "hotel id must be unique"],
    required:[true,"Please enter hotel id"],
  },
  hotel_name: {
    type: String,
    required: [true, 'Please enter first name'],
  },
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  postal_code: {
    type: String,
    uppercase: true,
    trim: true,
    required: true,
    minlength: [6, "Postal code must be six characters long"],
    maxlength: [6, "Postal code must be six characters long"]  
  },
  price:{
    type: Number,
    required:true,
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Duplicate Email Not allowed"],
    trim: true,
    uppercase: true,
    validate: function(value) {
      var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      return emailRegex.test(value);
    }
  },
  user_id:{
    type: String,
    required:[true,"Please enter user id"],
  }
});

const Hotel = mongoose.model("Hotel", HotelSchema);
module.exports = Hotel;