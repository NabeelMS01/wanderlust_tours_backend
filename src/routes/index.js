const express = require('express');
const router = express.Router();

const authRoutes = require('./auth/auth.routes');
const userRoutes = require('./user/user.routes');
const adminPackageRoutes = require('./admin/package.routes');
const packageRoutes = require('./package/package.routes');
const booking = require('./booking/booking.routes');



router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/admin/package', adminPackageRoutes);
router.use('/packages', packageRoutes); 
router.use('/booking', booking); 

module.exports = router;
 