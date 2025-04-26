
const protect = require('./auth.middleware');
const adminOnly = require('./admin.middleware');
const logger = require('./logger.middleware');

module.exports = {
  protect,
  adminOnly,
  logger,
};
