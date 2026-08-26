const express = require("express");
const upload = require("../config/multer");

const router = express.Router();

router.post("/", upload.single("image"), (req, res) => {
  try {
    res.status(200).json({
      message: "file recive successfully",
    });
  } catch (error) {
    return res.send(500).json({
      message: "Internal server error",
    });
  }
});

module.exports = router;
