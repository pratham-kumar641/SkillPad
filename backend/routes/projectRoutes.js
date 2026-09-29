const express = require('express');
const router = express.Router();
const { getProjects, createProject, updateProject, deleteProject } = require('../controllers/projectController');
const authMiddleware = require('../middleware/authMiddleware');

// @route   GET /api/projects
router.get('/', authMiddleware, getProjects);

// @route   POST /api/projects
router.post('/', authMiddleware, createProject);

// @route   PUT /api/projects/:id
router.put('/:id', authMiddleware, updateProject);

// @route   DELETE /api/projects/:id
router.delete('/:id', authMiddleware, deleteProject);

module.exports = router;
