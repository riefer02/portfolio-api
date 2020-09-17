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

// Program Logic
const AppError = require("./utils/appError");
const projectRouter = require("./routes/projectRoutes");

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
mongoose
	.connect(database, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((connection) => {
		console.log(`DB connection successful`);
	});
app.use(express.json({ limit: "10kb" })); // Limit Incoming Requests Data
app.use(mongoSanitize()); // Data Sanitization Against NoSQL Query Injection
app.use(xss()); // Data Sanitation Against XXS
app.use(cors()); // Open API Communication

// Routing
app.use("/api/v1/projects", projectRouter);

// Server Uplink
const server = app.listen(port, () =>
	console.log(`Server started on port: ${port}...`)
);
