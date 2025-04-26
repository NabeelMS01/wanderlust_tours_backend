const express = require('express');
const router = express.Router();
const { searchPackages, getPackageById } = require('../../controllers/package/package.controller');

// User Browsing Routes
router.get('/search', searchPackages);
router.get('/:id', getPackageById);

module.exports = router;
