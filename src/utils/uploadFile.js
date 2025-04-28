const path = require("path");
const fs = require("fs");

exports.saveUploadedFile = (file) => {
  const uploadDir = path.join(__dirname, "../../uploads");

  
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

 
  const ext = path.extname(file.originalname); 

  
  const filename = `${Date.now()}${ext}`;

 
  const filepath = path.join(uploadDir, filename);

 
  fs.writeFileSync(filepath, file.buffer);

 
  return `/uploads/${filename}`;
};
