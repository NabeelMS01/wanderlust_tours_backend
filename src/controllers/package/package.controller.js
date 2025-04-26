const Package = require('../../models/package/travelPackage.model');

// search & list Packages
exports.searchPackages = async (req, res) => {
  try {
    const { from, to, startDate, endDate, sortBy } = req.query;
    const today = new Date();
    const query = {};

    if (from) query.from = { $regex: from, $options: 'i' };
    if (to) query.to = { $regex: to, $options: 'i' };
    if (startDate) query.startDate = { $gte: new Date(startDate) };
    if (endDate) query.endDate = { $lte: new Date(endDate) };

    // if no search filters are provided, show upcoming or active packages
    if (!from && !to && !startDate && !endDate) {
      query.endDate = { $gte: today };
    }

    let packageQuery = Package.find(query);

    // optional sorting
    if (sortBy === 'price') {
      packageQuery = packageQuery.sort({ basePrice: 1 });
    } else if (sortBy === 'startDate') {
      packageQuery = packageQuery.sort({ startDate: 1 });
    }

    const packages = await packageQuery.exec();

    res.json(packages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

// get single package details
exports.getPackageById = async (req, res) => {
  try {
    const { id } = req.params;
    const travelPackage = await Package.findById(id);

    if (!travelPackage) {
      return res.status(404).json({ message: 'Package not found' });
    }

    res.json(travelPackage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong', error });
  }
};
