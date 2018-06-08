import { Router, Request, Response, NextFunction } from "express";
import * as mongoose from "mongoose";
import { Constants } from "../constants/constants";
import { IStudy, IModel } from "../models/";
import { IStudyModel, StudySchema, Study } from "../schemas/study.schema";
import * as authenticate from "express-jwt";
export class StudyController {
    public router: Router;
    constructor() {
        this.router = Router();
        this.init();
    }

    /**
     * GET all studies.
     * @method get
     */
    public getAll(req: Request, res: Response, next: NextFunction) {
        let query = Study.find({});
        query.exec(function(err, studies: IStudyModel[]) {
            if (err) {
                res.status(503).json({message: "Database connection error"});
            } else if (studies.length === 0) {
                res.status(400).json({message: "No studies exists"});
            } else {
                res.status(200).json({studies: studies});
            }
         });
    }

    /**
     * GET study by ID.
     * @method get
     */
    public getById(req: Request, res: Response, next: NextFunction) {
        let query = Study.findById(req.params.id);
        query.exec(function(err, study: IStudyModel) {
            if (err) {
                res.status(503).json({message: "Database connection error"});
            } else if (!study._id) {
                res.status(400).json({message: "No study exists by that id"});
            } else {
                res.status(200).json({study: study});
            }
         });
    }

    init() {
        this.router.get("/", authenticate({secret: new Constants().apiSecret}), this.getAll);
        this.router.get("/:id", authenticate({secret: new Constants().apiSecret}), this.getById);
    }

}

const studyController = new StudyController();
studyController.init();

export default studyController.router;
