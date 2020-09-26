const express = require("express");
const router = express.Router();

const imageController = require("../controllers/imageController");

router.post("/uploadImages", imageController.uploadImages);

module.exports = router;
