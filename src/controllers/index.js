const authController = require("./auth/auth.controller");

const userController = require("./user/user.controller");

const adminPackageController = require("./admin/package.controller");

const packageController = require("./package/package.controller");

const bookingController = require("./booking/booking.controller");

module.exports = {
  authController,
  userController,
  adminPackageController,
  packageController,
  bookingController,
};
