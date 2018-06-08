"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const constants_1 = require("./constants/constants");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
// Controllers
const user_controller_1 = require("./controllers/user.controller");
const course_controller_1 = require("./controllers/course.controller");
const study_controller_1 = require("./controllers/study.controller");
const Swagger_1 = require("./swagger/Swagger");
// Creates and configures an ExpressJS web server.
class App {
    // Run configuration methods on the Express instance.
    constructor() {
        this.express = express();
        this.constants = new constants_1.Constants();
        this.middleware();
        this.routes();
        this.setupSwagger(this.express);
    }
    // Configure Express middleware.
    middleware() {
        this.express.use(logger("dev"));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        mongoose.connect(this.constants.dbConnString, function (err) {
            if (err) {
                console.log(err);
            }
            else {
                console.log("Connected");
            }
        });
        mongoose.set("debug", true);
    }
    routes() {
        let router = express.Router();
        // Just for test
        router.get("/", (req, res, next) => {
            res.json({
                message: "Hello World! - The API is running"
            });
        });
        // Setup Routes
        this.express.use("/", router);
        this.express.use(this.constants.apiBasePath + "users", user_controller_1.default);
        this.express.use(this.constants.apiBasePath + "courses", course_controller_1.default);
        this.express.use(this.constants.apiBasePath + "studies", study_controller_1.default);
    }
    setupSwagger(app) {
        let token = jwt.sign({
            id: "swagger",
        }, new constants_1.Constants().apiSecret, {
            expiresIn: 120
        });
        let swagger = new Swagger_1.Swagger();
        swagger.readFolder("./src/res/api-docs");
        swagger.publish(app);
    }
}
exports.default = new App().express;
