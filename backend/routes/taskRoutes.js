const express = require('express');
const router = express.Router();
const { getTasks, createTask, updateTask, deleteTask, updateTaskStatus } = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

// @route   GET /api/tasks
router.get('/', authMiddleware, getTasks);

// @route   POST /api/tasks
router.post('/', authMiddleware, createTask);

// @route   PUT /api/tasks/:id
router.put('/:id', authMiddleware, updateTask);

// @route   PATCH /api/tasks/:id/status
router.patch('/:id/status', authMiddleware, updateTaskStatus);

// @route   DELETE /api/tasks/:id
router.delete('/:id', authMiddleware, deleteTask);

module.exports = router;
