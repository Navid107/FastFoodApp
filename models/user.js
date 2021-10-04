const mongoose = require('mongoose');


// Create your User Model
const userSchema = new mongoose.Schema({
    name: String,
    email: String, 
    googleId: String,
  },{
    timestamps: true
  });


// need to have a googleId on student 
module.exports = mongoose.model('User', userSchema);