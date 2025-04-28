const multer = require("multer");

// Setup storage (optional, for now just use memory)
const storage = multer.memoryStorage();

const upload = multer({ storage });

module.exports = upload;
