const express = require("express");
const createController = require("../controllers/user.controller");
const router = express.Router();

router.post("/create", createController);

module.exports = router;
