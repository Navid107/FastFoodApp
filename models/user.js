const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
	content: String,
  
  }, {
	timestamps: true
  });

// Create your User Model
const userSchema = new mongoose.Schema({
    name: String,
    email: String, 
    googleId: String,
  },{
    timestamps: true
  });
const foodSchema = new mongoose.Schema({
   
    name: String,
    value: Number,
    review: [reviewSchema]
  })

// need to have a googleId on student 
module.exports = mongoose.model('User', userSchema);