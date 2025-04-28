 
const path = require("path");
const fs = require("fs");
const { saveUploadedFile } = require("../../utils/uploadFile");
 
 
const { Package } = require("../../models");

exports.createPackage = async (req, res) => {
  try {
    const { title, from, to, startDate, endDate, basePrice } = req.body;
    const includedServices = req.body.includedServices || [];
    const optionalServices = req.body.optionalServices || [];

    let imageUrl = null;

    if (req.file) {
      imageUrl = saveUploadedFile(req.file);  
    }


    const newPackage = new Package({
      title,
      from,
      to,
      startDate,
      endDate,
      basePrice,
      includedServices,
      optionalServices,
      image: imageUrl,    
      createdBy: req.user._id,
    });

    await newPackage.save();

    res.status(201).json({
      message: "Package created successfully",
      package: newPackage,
    });
  } catch (error) {
    console.error("Error creating package:", error);
    res.status(500).json({ message: "Something went wrong", error });
  }
};


// edit travel package
exports.updatePackage = async (req, res) => {
  try {
    const { id } = req.params;

    const packageToUpdate = await Package.findById(id);

    if (!packageToUpdate) {
      return res.status(404).json({ message: "Package not found" });
    }

    const {
      title,
      from,
      to,
      startDate,
      endDate,
      basePrice,
      includedServices,
      optionalServices,
    } = req.body;

    // Determine if image is uploaded
    let imageUrl = packageToUpdate.image; // by default keep old image

    if (req.file) {
      imageUrl = saveUploadedFile(req.file); // new file uploaded
    } else if (req.body.existingImage) {
      imageUrl = req.body.existingImage; // old image passed from frontend
    }

    // Update all fields
    packageToUpdate.title = title;
    packageToUpdate.from = from;
    packageToUpdate.to = to;
    packageToUpdate.startDate = startDate;
    packageToUpdate.endDate = endDate;
    packageToUpdate.basePrice = basePrice;
    packageToUpdate.includedServices = includedServices || [];
    packageToUpdate.optionalServices = optionalServices || [];
    packageToUpdate.image = imageUrl;

    await packageToUpdate.save();

    res.json({ message: "Package updated successfully", package: packageToUpdate });
  } catch (error) {
    console.error("Error updating package:", error);
    res.status(500).json({ message: "Something went wrong", error });
  }
};


// delete travel package
exports.deletePackage = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPackage = await Package.findByIdAndDelete(id);

    if (!deletedPackage)
      return res.status(404).json({ message: "Package not found" });

    res.json({ message: "Package deleted successfully" });
  } catch (error) {
    console.error("Error deleting package:", error);
    res.status(500).json({ message: "Something went wrong", error });
  }
};

// list all packages
exports.listPackages = async (req, res) => {
  try {
    const packages = await Package.find().populate("createdBy", "name email");
    res.json(packages);
  } catch (error) {
    console.error("Error listing packages:", error);
    res.status(500).json({ message: "Something went wrong", error });
  }
};
