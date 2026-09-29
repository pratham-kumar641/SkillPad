const express = require('express');
const router = express.Router();
const { getSprints, createSprint, updateSprint, deleteSprint } = require('../controllers/sprintController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, getSprints);
router.post('/', authMiddleware, createSprint);
router.put('/:id', authMiddleware, updateSprint);
router.delete('/:id', authMiddleware, deleteSprint);

module.exports = router;
