const express = require('express');
const router = express.Router();
const { adminOnly, protect,uploadFile } = require('../../middlewares'); 
const {
  createPackage,
  updatePackage,
  deletePackage,
  listPackages,
} = require('../../controllers/admin/package.controller');


 
router.post('/', protect, adminOnly, uploadFile.single('image'), createPackage);
router.put('/:id', protect, adminOnly,uploadFile.single('image'), updatePackage);
router.delete('/:id', protect, adminOnly, deletePackage);
router.get('/', protect, adminOnly, listPackages);

module.exports = router;
