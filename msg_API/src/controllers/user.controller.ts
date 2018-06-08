import { Router, Request, Response, NextFunction } from "express";
import * as mongoose from "mongoose";
import { Constants } from "../constants/constants";
import { IUser, IModel, ICourse } from "../models/";
import { IUserModel, UserSchema, User } from "../schemas/user.schema";
import { STATUS_CODES } from "http";
import { Course, ICourseModel } from "../schemas/course.schema";
import * as jwt from "jsonwebtoken";
import * as authenticate from "express-jwt";
export class UserController {
    public router: Router;
    constructor() {
        authenticate({secret: "server secret"});
        this.router = Router();
        this.init();
    }

    /**
     * GET all users - Just for test!
     * @method get
     */
    public getAll(req: Request, res: Response, next: NextFunction) {
        let query = User.find({});
        query.exec(function(err, users: IUserModel[]) {
            res.json(users);
         });
    }

    /**
     * GET users by ID.
     * @method get
     */
    public getById(req: Request, res: Response, next: NextFunction) {
        let query = User.findById({ "_id": req.params.id});
        query.exec(function(err, user: IUserModel) {
            if (err) {
                res.status(503).json({message: "Database connection error"});
            } else if (!user._id) {
                res.status(400).json({message: "Wrong username or password"});
            } else {
                res.status(200).json({loggedInUser: user});
            }
        });
    }

     /**
     * Login.
     * @method post
     */
    public login(req: Request, res: Response, next: NextFunction) {
        let token = jwt.sign({
            id: req.body.username,
          }, new Constants().apiSecret, {
            expiresIn: 120
          });
        let query = User.findOne().and([{username: req.body.username}, {password: req.body.password}]);
        query.exec(function(err, user: IUserModel) {
            if (err) {
                res.status(503).json({message: "Database connection error"});
            } else if (!user) {
                res.status(400).json({message: "Wrong username or password"});
            } else {
                res.status(200).json({loggedInUser: user, token: token});
            }
        });
    }

     /**
     * GET user courses by userID.
     * @method get(:userId/courses)
     */
    public getCoursesByUserId(req: Request, res: Response, next: NextFunction) {
        let query = User.findOne({"_id": req.params.id});
        query.exec(function(err, user: IUserModel) {
            if (err) {
                res.status(503).json({message: "Database connection error"});
            } else if (!user) {
                res.status(400).json({message: "Wrong username"});
            } else {
                let queryCourses = Course.find({"_id": {$in: user.courses}});
                queryCourses.exec(function(err, courses: ICourseModel[]) {
                    res.json(courses);
                });
            }
        });
    }


     /**
     * Edit.
     * @method put(:userId)
     */
    public editUser(req: Request, res: Response, next: NextFunction) {
        let query = User.findOneAndUpdate({"_id": req.params.id}, req.body.newData);
        query.exec(function(err, user: IUserModel) {
            if (err) {
                res.status(503).json({message: "Database connection error"});
            } else if (!user) {
                res.status(400).json({message: "Wrong username or password"});
            } else {
                res.status(200).json({editUser: req.body.newData});
            }
        });
    }

     /**
     * Create.
     * @method post
     */
    public createUser(req: Request, res: Response, next: NextFunction) {
        let token = jwt.sign({
            id: req.body.user.username,
          }, new Constants().apiSecret, {
            expiresIn: 120
          });
        User.create(req.body.user, (err, user) => {
            if (err) {
                res.status(503).json({message: "Database connection error"});
            } else if (!user) {
                res.status(400).json({message: "No groups exists"});
            } else {
                res.status(201).json({createdUser: user, token: token});
            }
          });
    }

    init() {
        this.router.get("/", this.getAll);
        this.router.get("/:id", authenticate({secret: new Constants().apiSecret}), this.getById);
        this.router.get("/:id/courses", authenticate({secret: new Constants().apiSecret}), this.getCoursesByUserId);
        this.router.post("/login", this.login);
        this.router.post("/", this.createUser);
        this.router.put("/:id", authenticate({secret: new Constants().apiSecret}), this.editUser);
    }
}

const userController = new UserController();
userController.init();

export default userController.router;
