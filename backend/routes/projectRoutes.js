const express = require('express');
const router = express.Router();
const { getProjects, createProject, updateProject, deleteProject } = require('../controllers/projectController');
const authMiddleware = require('../middleware/authMiddleware');


router.get('/', authMiddleware, getProjects);


router.post('/', authMiddleware, createProject);


router.put('/:id', authMiddleware, updateProject);


router.delete('/:id', authMiddleware, deleteProject);

module.exports = router;
