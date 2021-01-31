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
  bookingDateEnd: {
    type: Date
  },
  confirmed: {
    type: Boolean,
    default: false
  },
  room: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Room'
    }
  ]
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
