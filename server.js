// Environmental Configuration
if (process.env.NODE_ENV === "development" || undefined) {
	require("dotenv").config({ path: "./config.env" });
}

// Project Environment
const path = require("path");
const express = require("express");
const app = express();
const mongoose = require("mongoose");

// Middleware Packages
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const history = require("connect-history-api-fallback");
const multer = require("multer"); // Image Uploader
const GridFsStorage = require("multer-gridfs-storage"); // Image Storage Mapping
const methodOverride = require("method-override"); // Remove Image Functionality

// Program Logic
const AppError = require("./utils/appError");
const projectRouter = require("./routes/projectRoutes");
const imageRouter = require("./routes/imageRoutes");
const testRouter = require("./routes/testRoutes");

// Limiter for IP Requests
const limiter = rateLimit({
	max: 100,
	windowMs: 60 * 60 * 1000,
	message: "Too many requests from this IP!",
});
app.use("/api", limiter);
app.use(history()); // SPA Application Requirement
app.use(helmet()); // HTTP Security Headers

// Database Establishment
let port = process.env.PORT || 6969;
if (port === null || port === "") port = 6969;
const database = process.env.MONGODB_URI;
const connect = mongoose.createConnection(database, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
let gfs; // Grid File System
connect.once("open", () => {
	// init stream
	gfs = new mongoose.mongo.GridFSBucket(connect.db, {
		bucketName: "uploads",
	});
});
app.use(express.json({ limit: "10mb" })); // Limit Incoming Requests Data
app.use(mongoSanitize()); // Data Sanitization Against NoSQL Query Injection
app.use(xss()); // Data Sanitation Against XXS
app.use(cors()); // Open API Communication

// Image Database Functionality
const storage = new GridFsStorage({
	url: process.env.MONGODB_URI,
	file: (req, file) => {
		return new Promise((resolve, reject) => {
			crypto.randomBytes(16, (err, buf) => {
				if (err) {
					return reject(err);
				}
				const filename =
					buf.toString("hex") + path.extname(file.originalname);
				const fileInto = {
					filename: filename,
					bucketName: "uploads",
				};
				resolve(fileInfo);
			});
		});
	},
});
const upload = multer({ storage });

// Routing
app.use("/api/v1/projects", projectRouter);
app.use("/api/v1/images", imageRouter);
app.use("/api/v1/test", testRouter);

// Server Uplink
const server = app.listen(port, () =>
	console.log(`Server started on port: ${port}... \n`)
);
