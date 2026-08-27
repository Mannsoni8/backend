const createController = (req, res) => {
  try {
    let body = req.body;
    let file = req.file;

    res.status(200).json({
      message: "Created",
      data: file,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = createController;
