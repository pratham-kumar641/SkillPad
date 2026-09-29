const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  projectName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  githubUrl: {
    type: String
  },
  liveUrl: {
    type: String
  },
  status: {
    type: String,
    default: 'Pending'
  },
  score: {
    type: Number
  },
  feedback: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Project', ProjectSchema);
