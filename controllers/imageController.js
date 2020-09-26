const Project = require("../models/Project.js");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.uploadImages = catchAsync(async (req, res) => {
	console.log("Uploading Images");
	res.json({
		message: "Images Uploaded",
	});
});
