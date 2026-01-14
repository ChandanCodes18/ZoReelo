const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  Fullname: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true
  },
  Phone: {
    type: Number,
    required: true,
    unique: true
  },
  Password:{
    type: String
  }
},
{
    timestamps: true
});

const usermodel = mongoose.model('User',UserSchema)

module.exports = usermodel;