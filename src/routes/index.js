const express = require('express');
const router = express.Router();

const authRoutes = require('./auth/auth.routes');
const userRoutes = require('./user/user.routes');

// Use router here instead of app
router.use('/auth', authRoutes);
router.use('/user', userRoutes);

module.exports = router;
