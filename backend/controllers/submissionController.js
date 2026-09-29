const Submission = require('../models/Submission');




const getSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find().populate('studentId', 'name email').populate('taskId');
    res.json(submissions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};




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
