const Package = require('../../models/package/travelPackage.model');

// Add Travel Package
exports.createPackage = async (req, res) => {
  try {
    const { from, to, startDate, endDate, basePrice, includedServices } = req.body;

    const travelPackage = await Package.create({
      from,
      to,
      startDate,
      endDate,
      basePrice,
      includedServices,
      createdBy: req.user._id
    });

    res.status(201).json({ message: 'Package created successfully', travelPackage });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

// Edit Travel Package
exports.updatePackage = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedPackage = await Package.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedPackage) return res.status(404).json({ message: 'Package not found' });

    res.json({ message: 'Package updated successfully', updatedPackage });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

// Delete Travel Package
exports.deletePackage = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPackage = await Package.findByIdAndDelete(id);

    if (!deletedPackage) return res.status(404).json({ message: 'Package not found' });

    res.json({ message: 'Package deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

// List all Packages
exports.listPackages = async (req, res) => {
  try {
    const packages = await Package.find().populate('createdBy', 'name email');
    res.json(packages);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};
