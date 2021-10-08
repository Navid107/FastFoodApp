const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  content: String,
  rating: { type: Number, min: 1, max: 5, default: 5 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

const orderSchema = new mongoose.Schema({
  burgerValue: {type: Number, default: 0, required: true },
  friesValue: {type: Number, default: 0, required: true },
  sodaValue: {type: Number, default: 0, required: true },
  price: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  finalOrder: Boolean,
  reviews: [reviewSchema]
})

module.exports = mongoose.model('Order', orderSchema);