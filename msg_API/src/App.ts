import * as path from "path";
import * as express from "express";
import * as logger from "morgan";
import * as bodyParser from "body-parser";
import { Constants } from "./constants/constants";
import * as mongoose from "mongoose";
import * as jwt from "jsonwebtoken";

// Controllers
import UserController from "./controllers/user.controller";
import CourseController from "./controllers/course.controller";
import StudyController from "./controllers/study.controller";
import { Swagger } from "./swagger/Swagger";

// Creates and configures an ExpressJS web server.
class App {
    // ref to Express instance
    public express: express.Application;
    public constants: Constants;

    // Run configuration methods on the Express instance.
    constructor() {
        this.express = express();
        this.constants = new Constants();
        this.middleware();
        this.routes();
        this.setupSwagger(this.express);
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(logger("dev"));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        mongoose.connect(this.constants.dbConnString, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log("Connected");
            }
        });
        mongoose.set("debug", true);
    }

    private routes(): void {
        let router = express.Router();
        // Just for test
        router.get("/", (req, res, next) => {
            res.json({
                message: "Hello World! - The API is running"
            });
        });
        // Setup Routes
        this.express.use("/", router);
        this.express.use(this.constants.apiBasePath + "users", UserController);
        this.express.use(this.constants.apiBasePath + "courses", CourseController);
        this.express.use(this.constants.apiBasePath + "studies", StudyController);
    }

    private setupSwagger(app: express.Application): void {
        let token = jwt.sign({
            id: "swagger",
          }, new Constants().apiSecret, {
            expiresIn: 120
          });
        let swagger = new Swagger();
        swagger.readFolder("./src/res/api-docs");
        swagger.publish(app);
    }
}

export default new App().express;
