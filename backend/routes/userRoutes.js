const express = require('express');
const router = express.Router();
const { getStudents, getStudentPortfolio } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/students', authMiddleware, getStudents);
router.get('/students/:id', authMiddleware, getStudentPortfolio);

module.exports = router;
