
const protect = require('./auth.middleware');
const adminOnly = require('./admin.middleware');
const logger = require('./logger.middleware');
const uploadFile = require('./upload.middleware');

module.exports = {
  protect,
  adminOnly,
  logger,
  uploadFile
};
