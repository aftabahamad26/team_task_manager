const express = require('express');
const router = express.Router();
const {
  createProject,
  getProjects,
  getProjectById,
} = require('../controllers/projectController');
const { protect, admin } = require('../middleware/auth.js');

router.route('/').get(protect, getProjects).post(protect, admin, createProject);
router.route('/:id').get(protect, getProjectById);

module.exports = router;
