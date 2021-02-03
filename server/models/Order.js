const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
    room: {
        type: Schema.Types.ObjectId,
        ref: 'Room',
        required: true
      },
      booking:
        {
          type: Schema.Types.ObjectId,
          ref: 'Booking',
          required: true
        }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;