const express = require('express');
const router = express.Router();
const { getTasks, createTask, updateTask, deleteTask, updateTaskStatus } = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');


router.get('/', authMiddleware, getTasks);


router.post('/', authMiddleware, createTask);


router.put('/:id', authMiddleware, updateTask);


router.patch('/:id/status', authMiddleware, updateTaskStatus);


router.delete('/:id', authMiddleware, deleteTask);

module.exports = router;
