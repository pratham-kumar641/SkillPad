const User = require('../models/User');
const Task = require('../models/Task');
const Project = require('../models/Project');
const Submission = require('../models/Submission');

// Get all students
const getStudents = async (req, res) => {
  try {
    const students = await User.find({ role: 'Student' }).select('-password');
    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get student detail portfolio
const getStudentPortfolio = async (req, res) => {
  try {
    const student = await User.findById(req.params.id).select('-password');
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const projects = await Project.find({ studentId: req.params.id });
    const submissions = await Submission.find({ studentId: req.params.id }).populate('taskId');

    res.json({
      student,
      projects,
      submissions
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getStudents,
  getStudentPortfolio
};
