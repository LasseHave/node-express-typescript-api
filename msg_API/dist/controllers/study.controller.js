"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const constants_1 = require("../constants/constants");
const study_schema_1 = require("../schemas/study.schema");
const authenticate = require("express-jwt");
class StudyController {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    /**
     * GET all studies.
     * @method get
     */
    getAll(req, res, next) {
        let query = study_schema_1.Study.find({});
        query.exec(function (err, studies) {
            if (err) {
                res.status(503).json({ message: "Database connection error" });
            }
            else if (studies.length === 0) {
                res.status(400).json({ message: "No studies exists" });
            }
            else {
                res.status(200).json({ studies: studies });
            }
        });
    }
    /**
     * GET study by ID.
     * @method get
     */
    getById(req, res, next) {
        let query = study_schema_1.Study.findById(req.params.id);
        query.exec(function (err, study) {
            if (err) {
                res.status(503).json({ message: "Database connection error" });
            }
            else if (!study._id) {
                res.status(400).json({ message: "No study exists by that id" });
            }
            else {
                res.status(200).json({ study: study });
            }
        });
    }
    init() {
        this.router.get("/", authenticate({ secret: new constants_1.Constants().apiSecret }), this.getAll);
        this.router.get("/:id", authenticate({ secret: new constants_1.Constants().apiSecret }), this.getById);
    }
}
exports.StudyController = StudyController;
const studyController = new StudyController();
studyController.init();
exports.default = studyController.router;
