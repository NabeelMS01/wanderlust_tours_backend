const express = require('express');
const router = express.Router();
const { adminOnly, protect } = require('../../middlewares'); 
const {
  createPackage,
  updatePackage,
  deletePackage,
  listPackages,
} = require('../../controllers/admin/package.controller');


// protect and admin only
router.post('/', protect, adminOnly, createPackage);
router.put('/:id', protect, adminOnly, updatePackage);
router.delete('/:id', protect, adminOnly, deletePackage);
router.get('/', protect, adminOnly, listPackages);

module.exports = router;
