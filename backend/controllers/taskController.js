const mongoose = require('mongoose');
const Task = require('../models/Task');
const Project = require('../models/Project');
const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');

const createTask = asyncHandler(async (req, res) => {
  const { title, description, status, dueDate, project, assignedTo } = req.body;
  const task = new Task({
    title,
    description,
    status,
    dueDate,
    project,
    assignedTo,
    assignedBy: req.user._id,
  });

  const createdTask = await task.save();
  res.status(201).json(createdTask);
});

const getTasksByProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.projectId).populate('admin', 'name email');
  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  // If not Admin, check if user is admin or member of the project
  if (req.user.role !== 'admin' && req.user.role !== 'Admin' && project.admin._id.toString() !== req.user._id.toString() && !project.members.includes(req.user._id)) {
    res.status(401);
    throw new Error('Not authorized to view tasks for this project');
  }

  const tasks = await Task.find({ project: req.params.projectId })
    .populate('assignedTo', 'name email')
    .populate('assignedBy', 'name email');
  
  // Dynamic fallback for legacy data
  const populatedTasks = tasks.map(task => {
    const taskObj = task.toObject();
    if (!taskObj.assignedBy) {
      taskObj.assignedBy = project.admin;
    }
    return taskObj;
  });

  res.json(populatedTasks);
});

const updateTaskStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  
  if (!status) {
    res.status(400);
    throw new Error('Status is required');
  }

  const task = await Task.findById(req.params.id).populate('project');

  if (task) {
    // Check if user is assigned to task or is admin
    const isAssigned = task.assignedTo && task.assignedTo.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin' || req.user.role === 'Admin';
    
    if (!isAssigned && !isAdmin) {
      res.status(401);
      throw new Error('Not authorized to update this task');
    }

    // Handle legacy tasks that might be missing assignedBy
    if (!task.assignedBy) {
      // Fallback to project admin if available, otherwise current user (if admin)
      task.assignedBy = task.project?.admin || req.user._id;
    }

    task.status = status;
    const updatedTask = await task.save();
    res.json(updatedTask);
  } else {
    res.status(404);
    throw new Error('Task not found');
  }
});

const getMyTasks = asyncHandler(async (req, res) => {
  let query = {};
  
  // If not Admin, only show tasks assigned to the user
  if (req.user.role !== 'admin' && req.user.role !== 'Admin') {
    query = { assignedTo: req.user._id };
  }

  const tasks = await Task.find(query)
    .populate({
      path: 'project',
      select: 'name admin',
      populate: { path: 'admin', select: 'name email' }
    })
    .populate('assignedTo', 'name email')
    .populate('assignedBy', 'name email');

  // Dynamic fallback for legacy data
  const populatedTasks = tasks.map(task => {
    const taskObj = task.toObject();
    if (!taskObj.assignedBy && taskObj.project && taskObj.project.admin) {
      taskObj.assignedBy = taskObj.project.admin;
    }
    return taskObj;
  });

  res.json(populatedTasks);
});

const getDashboardStats = asyncHandler(async (req, res) => {
  let query = {};
  
  // If not Admin, filter stats by assigned user
  if (req.user.role !== 'admin' && req.user.role !== 'Admin') {
    query = { assignedTo: req.user._id };
  }

  const totalTasks = await Task.countDocuments(query);
  const completedTasks = await Task.countDocuments({
    ...query,
    status: 'Done',
  });
  const pendingTasks = await Task.countDocuments({
    ...query,
    status: 'Pending',
  });
  const inProgressTasks = await Task.countDocuments({
    ...query,
    status: 'In Progress',
  });

  res.json({
    totalTasks,
    completedTasks,
    pendingTasks,
    inProgressTasks,
  });
});

const getAdminTaskSummary = asyncHandler(async (req, res) => {
  const summary = await Task.aggregate([
    {
      $group: {
        _id: '$assignedTo',
        totalTasks: { $sum: 1 },
        completed: {
          $sum: { $cond: [{ $eq: ['$status', 'Done'] }, 1, 0] },
        },
        pending: {
          $sum: { $cond: [{ $eq: ['$status', 'Pending'] }, 1, 0] },
        },
        inProgress: {
          $sum: { $cond: [{ $eq: ['$status', 'In Progress'] }, 1, 0] },
        },
        assignedBy: { $first: '$assignedBy' },
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: '_id',
        as: 'member',
      },
    },
    { $unwind: '$member' },
    {
      $lookup: {
        from: 'users',
        localField: 'assignedBy',
        foreignField: '_id',
        as: 'creator',
      },
    },
    { $unwind: '$creator' },
    {
      $project: {
        _id: 0,
        memberId: '$_id',
        memberName: '$member.name',
        assignedBy: '$creator.name',
        totalTasks: 1,
        completed: 1,
        pending: 1,
        inProgress: 1,
        remaining: { $subtract: ['$totalTasks', '$completed'] },
      },
    },
  ]);

  res.json(summary);
});

module.exports = {
  createTask,
  getTasksByProject,
  updateTaskStatus,
  getMyTasks,
  getDashboardStats,
  getAdminTaskSummary,
};
