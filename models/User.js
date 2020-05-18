const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: String,
});

module.exports = mongoose.model('Users', UserSchema);
