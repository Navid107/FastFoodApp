const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
   content: String,
   rating: Number,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
  })

  module.exports = mongoose.model('Review', reviewSchema);