const { Booking, Package } = require("../../models");

// book a package
// book a package
exports.bookPackage = async (req, res) => {
  try {
    const { packageId, selectedOptionalServices ,selectedServiceIds } = req.body;

    const travelPackage = await Package.findById(packageId);
    if (!travelPackage) return res.status(404).json({ message: 'Package not found' });

    // find selected optional services
    const selectedServices = travelPackage.optionalServices.filter(service =>
      selectedServiceIds?.includes(service._id.toString())
    );

    // calculate total price correctly
    let totalPrice = travelPackage.basePrice;
    selectedServices.forEach(service => {
      totalPrice += service.price;
    });

    // create booking
    const booking = await Booking.create({
      user: req.user._id,
      package: packageId,
      selectedOptionalServices, // store the selected service ids
      selectedOptionalServicesDetails: selectedServices, // store selected service objects (name, price)
      totalPrice, // save the final calculated price
      heldUntil: new Date(Date.now() + 5 * 60 * 1000),
    });

    res.status(201).json({ message: 'booking created successfully', booking });
  } catch (error) {
    console.error('error creating booking:', error);
    res.status(500).json({ message: 'something went wrong', error });
  }
};


// get all my bookings
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate('package');
    res.json(bookings);
  } catch (error) {
    console.error('error fetching bookings:', error);
    res.status(500).json({ message: 'something went wrong', error });
  }
};

// confirm booking
exports.confirmBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id);

    if (!booking) return res.status(404).json({ message: 'booking not found' });
    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'not authorized to confirm this booking' });
    }

    booking.status = 'confirmed';
    await booking.save();

    res.json({ message: 'booking confirmed', booking });
  } catch (error) {
    console.error('error confirming booking:', error);
    res.status(500).json({ message: 'something went wrong', error });
  }
};

// cancel booking
exports.cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id);

    if (!booking) return res.status(404).json({ message: 'booking not found' });
    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'not authorized to cancel this booking' });
    }

    booking.status = 'cancelled';
    await booking.save();

    res.json({ message: 'booking cancelled', booking });
  } catch (error) {
    console.error('error cancelling booking:', error);
    res.status(500).json({ message: 'something went wrong', error });
  }
};
