const express = require('express');
const router = express.Router();
const { runCode, reviewCode } = require('../controllers/codeController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/run', authMiddleware, runCode);
router.post('/review', authMiddleware, reviewCode);

module.exports = router;
