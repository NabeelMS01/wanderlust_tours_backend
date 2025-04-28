const cron = require('node-cron');
const { Booking } = require('../models');

// run every 1 minute
cron.schedule('* * * * *', async () => {
  try {
    const now = new Date();

    const expiredBookings = await Booking.find({
      status: 'pending',
      heldUntil: { $lt: now }
    });

    for (const booking of expiredBookings) {
      booking.status = 'cancelled';
      await booking.save();
      console.log(`Booking ID ${booking._id} automatically cancelled (slot hold expired)`);
    }
  } catch (error) {
    console.error('error cancelling expired bookings:', error);
  }
});
