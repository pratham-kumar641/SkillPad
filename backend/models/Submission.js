const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
    required: true
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  solution: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'Submitted'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Submission', SubmissionSchema);
