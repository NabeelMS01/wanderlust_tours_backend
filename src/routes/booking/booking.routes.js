const express = require('express');
const router = express.Router();
const { bookPackage, getUserBookings, confirmBooking, cancelBooking } = require('../../controllers/booking/booking.controller');
const { protect } = require('../../middlewares');  

// Protected Routes
router.post('/book', protect, bookPackage); 
router.get('/', protect, getUserBookings); 
router.patch('/:id/confirm', protect, confirmBooking); 
router.patch('/:id/cancel', protect, cancelBooking);  

module.exports = router;
