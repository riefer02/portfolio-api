const Project = require("../models/Project.js");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getProjects = catchAsync(async (req, res) => {
	console.log("Retrieving Projects...");
	const projects = await Project.find({}, (err) => {
		if (err) {
			console.log(err);
			return;
		}
	});
	res.status(200).json({
		projects,
	});
});

exports.createProject = catchAsync(async (req, res) => {
	console.log("Creating Project...");
	const project = new Project.create({
		title: req.body.title,
		summary: req.body.summary,
		link: req.body.link,
		tags: req.body.tags,
		knowledges: req.body.knowledges,
		producers: req.body.producers,
		images: req.body.images,
	});
	console.log("Writing project to database...");
	const newProject = await project.save().then(() => {
		console.log("Success");
		res.status(200).json({
			newProject,
		});
	});
});
