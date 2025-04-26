const express = require('express');
const router = express.Router();
const userController = require('../../controllers/user/user.controller'); 
const protect = require('../../middlewares/auth.middleware');
const adminOnly = require('../../middlewares/admin.middleware');

router.get('/me', protect, (req, res) => {
  res.json({ user: req.user });
});

router.get('/admin-data', protect, adminOnly, (req, res) => {
  res.json({ message: 'This is admin-only data' });
});

  
router.get('/list',protect, userController.getAllUsers);

module.exports = router;
