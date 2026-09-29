const express = require('express');
const router = express.Router();
const { getSubmissions, createSubmission, updateSubmission } = require('../controllers/submissionController');
const authMiddleware = require('../middleware/authMiddleware');


router.get('/', authMiddleware, getSubmissions);


router.post('/', authMiddleware, createSubmission);


router.put('/:id', authMiddleware, updateSubmission);

module.exports = router;
