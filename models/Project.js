const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, "Project Name Required"],
		},
		summary: {
			type: String,
			required: [true, "Summary Required"],
		},
		link: {
			type: String,
			required: [false, "Project Link Required"],
		},
		tags: {
			type: Array,
			required: [true, "Add One or More Tags"],
		},
		knowledges: {
			type: Array,
			required: [true, "Add One or More Skills/Knowledges"],
		},
		producers: {
			type: Array,
		},
		images: {
			type: Array,
			required: [true, "Add Atleast One Image"],
		},
	},
	{ timestamps: { createdAt: "createdAt" } }
);

module.exports = mongoose.model("Project", projectSchema);
