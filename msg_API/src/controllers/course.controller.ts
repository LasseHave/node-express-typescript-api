import { Router, Request, Response, NextFunction } from "express";
import * as mongoose from "mongoose";
import { Constants } from "../constants/constants";
import { ICourse, IModel } from "../models/";
import { ICourseModel, CourseSchema, Course } from "../schemas/course.schema";
import * as authenticate from "express-jwt";
export class CourseController {
    public router: Router;
    constructor() {
        this.router = Router();
        this.init();
    }

    /**
     * GET all courses.
     * @method get
     */
    public getAll(req: Request, res: Response, next: NextFunction) {
        let query = Course.find({});
        query.exec(function(err, courses: ICourseModel[]) {
            if (err) {
                res.status(503).json({message: "Database connection error"});
            } else if (courses.length === 0) {
                res.status(400).json({message: "No groups exists"});
            } else {
                res.status(200).json({courses: courses});
            }
         });
    }

    /**
     * GET course by ID.
     * @method get
     */
    public getById(req: Request, res: Response, next: NextFunction) {
        let query = Course.findById(req.params.id);
        query.exec(function(err, course: ICourseModel) {
            if (err) {
                res.status(503).json({message: "Database connection error"});
            } else if (!course) {
                res.status(400).json({message: "No groups exists"});
            } else {
                res.status(200).json({course: course});
            }
         });
    }

    init() {
        this.router.get("/", authenticate({secret: new Constants().apiSecret}), this.getAll);
        this.router.get("/:id", authenticate({secret: new Constants().apiSecret}), this.getById);
    }

}

const courseController = new CourseController();
courseController.init();

export default courseController.router;
