const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();
const connection = require("./src/mongodb-connection/connection");

dotenv.config();

const port = process.env.PORT || 3001;

//import routers
const v1Routes = require("./src/routes/v1.routes");
const invalidRoutes = require("./src/routes/invalid.routes");

//error handler
const errorHandler = require("./src/utils/errorHandler");

//db connection
connection();

//app security
app.use(helmet());

//middlewares
app.use(cors());

if (process.env.NODE_ENV !== "production") {
	app.use(morgan("tiny"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//use routers
app.use("/api", v1Routes);
app.use(invalidRoutes);

//error handler middleware
app.use(errorHandler);

app.listen(port, () => {
	console.log("App is running on port", port);
});
