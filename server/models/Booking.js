const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  hotel_id:{
    type: Number,
    required:[true,"Please enter hotel id"],
  },
  booking_date: {
    type: String,
    required: [true, 'Please enter Booking Date']
  },
  booking_start: {
    type: String,
    required: [true, 'Please enter Booking Start date']
  },
  booking_end: {
    type: String,
    required: [true, 'Please enter Booking End date']
  },
  user_id:{
    type: String,
    required:[true,"Please enter user id"]
  }
});

const Booking = mongoose.model("Booking", BookingSchema);
module.exports = Booking;