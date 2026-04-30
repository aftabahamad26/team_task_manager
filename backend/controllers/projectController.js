const Project = require('../models/Project');
const asyncHandler = require('../utils/asyncHandler');

const createProject = asyncHandler(async (req, res) => {
  const { name, description, members } = req.body;
  const project = new Project({
    name,
    description,
    members,
    admin: req.user._id,
  });

  const createdProject = await project.save();
  res.status(201).json(createdProject);
});

const getProjects = asyncHandler(async (req, res) => {
  let query = {};
  
  // If not Admin, only show projects where user is the admin or a member
  if (req.user.role !== 'admin' && req.user.role !== 'Admin') {
    query = {
      $or: [{ admin: req.user._id }, { members: req.user._id }],
    };
  }

  const projects = await Project.find(query).populate('admin members', 'name email');
  res.json(projects);
});

const getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id).populate(
    'admin members',
    'name email'
  );

  if (project) {
    // Check access for non-admins
    if (req.user.role !== 'admin' && req.user.role !== 'Admin' && 
        project.admin.toString() !== req.user._id.toString() && 
        !project.members.includes(req.user._id)) {
      res.status(401);
      throw new Error('Not authorized to view this project');
    }
    res.json(project);
  } else {
    res.status(404);
    throw new Error('Project not found');
  }
});

module.exports = { createProject, getProjects, getProjectById };
