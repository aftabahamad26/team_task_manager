const express = require('express');
const router = express.Router();
const {
  registerUser,
  authUser,
  getUsers,
} = require('../controllers/authController');
const { protect, admin } = require('../middleware/auth.js');

router.post('/register', registerUser);
router.post('/login', authUser);
router.get('/users', protect, getUsers);

module.exports = router;
