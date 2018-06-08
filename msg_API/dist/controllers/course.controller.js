"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const constants_1 = require("../constants/constants");
const course_schema_1 = require("../schemas/course.schema");
const authenticate = require("express-jwt");
class CourseController {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    /**
     * GET all courses.
     * @method get
     */
    getAll(req, res, next) {
        let query = course_schema_1.Course.find({});
        query.exec(function (err, courses) {
            if (err) {
                res.status(503).json({ message: "Database connection error" });
            }
            else if (courses.length === 0) {
                res.status(400).json({ message: "No groups exists" });
            }
            else {
                res.status(200).json({ courses: courses });
            }
        });
    }
    /**
     * GET course by ID.
     * @method get
     */
    getById(req, res, next) {
        let query = course_schema_1.Course.findById(req.params.id);
        query.exec(function (err, course) {
            if (err) {
                res.status(503).json({ message: "Database connection error" });
            }
            else if (!course) {
                res.status(400).json({ message: "No groups exists" });
            }
            else {
                res.status(200).json({ course: course });
            }
        });
    }
    init() {
        this.router.get("/", authenticate({ secret: new constants_1.Constants().apiSecret }), this.getAll);
        this.router.get("/:id", authenticate({ secret: new constants_1.Constants().apiSecret }), this.getById);
    }
}
exports.CourseController = CourseController;
const courseController = new CourseController();
courseController.init();
exports.default = courseController.router;
