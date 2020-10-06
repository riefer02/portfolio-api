const Test = require("../models/Test.js");
const catchAsync = require("../utils/catchAsync");

exports.testDb = catchAsync(async (req, res, next) => {
	console.log("Pre-FUCK!");

	let obj = {
		name: "fuckhead",
	};
	console.log(obj);
	obj = JSON.stringify(obj);
	console.log(obj);
	obj = JSON.parse(obj);
	console.log(obj);
	// const test = new Test({
	// 	name: "fuck boy",s
	// });
	// console.log(test);
	res.json({
		message: "Fuck Off",
		obj,
	});
});
