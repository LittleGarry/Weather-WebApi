const mongoose = require('mongoose');

const CitySchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  id: {
    type: Number,
    required: true,
  },
});

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    max: 1024,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  cities: {
    type: [CitySchema],
  }
});

module.exports = mongoose.model('User', UserSchema);
