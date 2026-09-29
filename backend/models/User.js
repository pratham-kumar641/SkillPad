const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: ['Student', 'Faculty', 'Recruiter']
  },
  skills: {
    type: [String],
    default: ['React.js', 'Node.js', 'MongoDB', 'JavaScript', 'REST API', 'Git']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
