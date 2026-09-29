const express = require('express');
const router = express.Router();
const { getSubmissions, createSubmission, updateSubmission } = require('../controllers/submissionController');
const authMiddleware = require('../middleware/authMiddleware');

// @route   GET /api/submissions
router.get('/', authMiddleware, getSubmissions);

// @route   POST /api/submissions
router.post('/', authMiddleware, createSubmission);

// @route   PUT /api/submissions/:id
router.put('/:id', authMiddleware, updateSubmission);

module.exports = router;
