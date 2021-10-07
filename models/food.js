const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  content: String,
  rating: { type: Number, min: 1, max: 5, default: 5 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

const orderSchema = new mongoose.Schema({
  burgerValue: Number,
  friesValue: Number,
  sodaValue: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  reviews: [reviewSchema]
})
module.exports = mongoose.model('Order', orderSchema);