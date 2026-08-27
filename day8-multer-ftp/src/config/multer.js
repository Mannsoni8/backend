const multer = require("multer");

//multer provide two storage
//1. diskStorage->localy save
//2. Memory Storage -> google/server pe storage

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // size and ratio and formate check kr sk te h

    console.log("in filename->", file);
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// for server
const storageForServer = multer.memoryStorage();

const upload = multer({ storage });

module.exports = upload;
