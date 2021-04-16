const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  hotel_id:{
    type: Number,
    required:[true,"Please enter hotel id"],
  },
  booking_date: {
    type: String,
    required: [true, 'Please enter Booking Date'],
    validate: function(value) {
      var dateRegex = /^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d$/;
      return dateRegex.test(value);
    }
  },
  booking_start: {
    type: String,
    required: [true, 'Please enter Booking Start date'],
    validate: function(value) {
      var dateRegex = /^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d$/;
      return dateRegex.test(value);
    }
  },
  booking_end: {
    type: String,
    required: [true, 'Please enter Booking End date'],
    validate: function(value) {
      var dateRegex = /^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d$/;
      return dateRegex.test(value);
    }
  },
  user_id:{
    type: String,
    required:[true,"Please enter user id"],
  }
});

const Booking = mongoose.model("Booking", BookingSchema);
module.exports = Booking;