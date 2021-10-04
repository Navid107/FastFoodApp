const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
   burgerValue: Number,
   FriesValue: Number,
   sodaValue: Number,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
  })

  module.exports = mongoose.model('Order', orderSchema);