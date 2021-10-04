const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  text: String
}, {
  timestamps: true
});

// Create your User Model
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    cohort: String,
    avatar: String,
    googleId: String,
    review: [reviewSchema]
  },{
    timestamps: true
  });

// need to have a googleId on student 
module.exports = mongoose.model('User', userSchema);