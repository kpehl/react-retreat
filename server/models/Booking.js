const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookingSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  bookingDateStart: {
    type: Date,
    default: Date.now
  },
  bookingDuration: {
    type: Number,
    default: 1
  },
  confirmed: {
    type: Boolean,
    default: false
  },
  bookings: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Room'
    }
  ]
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
