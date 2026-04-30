const express = require('express');
const router = express.Router();
const {
  createTask,
  getTasksByProject,
  updateTaskStatus,
  getMyTasks,
  getDashboardStats,
  getAdminTaskSummary,
} = require('../controllers/taskController');
const { protect, admin } = require('../middleware/auth.js');

router.route('/').post(protect, admin, createTask);
router.get('/my-tasks', protect, getMyTasks);
router.get('/stats', protect, getDashboardStats);
router.get('/summary/admin', protect, admin, getAdminTaskSummary);
router.get('/project/:projectId', protect, getTasksByProject);
router.put('/:id/status', protect, updateTaskStatus);
router.put('/:id', protect, updateTaskStatus);

module.exports = router;
