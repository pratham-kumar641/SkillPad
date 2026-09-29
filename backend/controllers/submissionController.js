const Submission = require('../models/Submission');

// @desc    Get all submissions
// @route   GET /api/submissions
// @access  Private
const getSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find().populate('studentId', 'name email').populate('taskId');
    res.json(submissions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Create a submission
// @route   POST /api/submissions
// @access  Private
const createSubmission = async (req, res) => {
  try {
    const newSubmission = new Submission({
      ...req.body,
      studentId: req.user.userId || req.user.id
    });

    const submission = await newSubmission.save();
    res.json(submission);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Update a submission
// @route   PUT /api/submissions/:id
// @access  Private
const updateSubmission = async (req, res) => {
  try {
    let submission = await Submission.findById(req.params.id);

    if (!submission) {
      return res.status(404).json({ msg: 'Submission not found' });
    }

    submission = await Submission.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.json(submission);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getSubmissions,
  createSubmission,
  updateSubmission
};
