"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const constants_1 = require("../constants/constants");
const user_schema_1 = require("../schemas/user.schema");
const course_schema_1 = require("../schemas/course.schema");
const jwt = require("jsonwebtoken");
const authenticate = require("express-jwt");
class UserController {
    constructor() {
        authenticate({ secret: "server secret" });
        this.router = express_1.Router();
        this.init();
    }
    /**
     * GET all users - Just for test!
     * @method get
     */
    getAll(req, res, next) {
        let query = user_schema_1.User.find({});
        query.exec(function (err, users) {
            res.json(users);
        });
    }
    /**
     * GET users by ID.
     * @method get
     */
    getById(req, res, next) {
        let query = user_schema_1.User.findById({ "_id": req.params.id });
        query.exec(function (err, user) {
            if (err) {
                res.status(503).json({ message: "Database connection error" });
            }
            else if (!user._id) {
                res.status(400).json({ message: "Wrong username or password" });
            }
            else {
                res.status(200).json({ loggedInUser: user });
            }
        });
    }
    /**
    * Login.
    * @method post
    */
    login(req, res, next) {
        let token = jwt.sign({
            id: req.body.username,
        }, new constants_1.Constants().apiSecret, {
            expiresIn: 120
        });
        let query = user_schema_1.User.findOne().and([{ username: req.body.username }, { password: req.body.password }]);
        query.exec(function (err, user) {
            if (err) {
                res.status(503).json({ message: "Database connection error" });
            }
            else if (!user) {
                res.status(400).json({ message: "Wrong username or password" });
            }
            else {
                res.status(200).json({ loggedInUser: user, token: token });
            }
        });
    }
    /**
    * GET user courses by userID.
    * @method get(:userId/courses)
    */
    getCoursesByUserId(req, res, next) {
        let query = user_schema_1.User.findOne({ "_id": req.params.id });
        query.exec(function (err, user) {
            if (err) {
                res.status(503).json({ message: "Database connection error" });
            }
            else if (!user) {
                res.status(400).json({ message: "Wrong username" });
            }
            else {
                let queryCourses = course_schema_1.Course.find({ "_id": { $in: user.courses } });
                queryCourses.exec(function (err, courses) {
                    res.json(courses);
                });
            }
        });
    }
    /**
    * Edit.
    * @method put(:userId)
    */
    editUser(req, res, next) {
        let query = user_schema_1.User.findOneAndUpdate({ "_id": req.params.id }, req.body.newData);
        query.exec(function (err, user) {
            if (err) {
                res.status(503).json({ message: "Database connection error" });
            }
            else if (!user) {
                res.status(400).json({ message: "Wrong username or password" });
            }
            else {
                res.status(200).json({ editUser: req.body.newData });
            }
        });
    }
    /**
    * Create.
    * @method post
    */
    createUser(req, res, next) {
        let token = jwt.sign({
            id: req.body.user.username,
        }, new constants_1.Constants().apiSecret, {
            expiresIn: 120
        });
        user_schema_1.User.create(req.body.user, (err, user) => {
            if (err) {
                res.status(503).json({ message: "Database connection error" });
            }
            else if (!user) {
                res.status(400).json({ message: "No groups exists" });
            }
            else {
                res.status(201).json({ createdUser: user, token: token });
            }
        });
    }
    init() {
        this.router.get("/", this.getAll);
        this.router.get("/:id", authenticate({ secret: new constants_1.Constants().apiSecret }), this.getById);
        this.router.get("/:id/courses", authenticate({ secret: new constants_1.Constants().apiSecret }), this.getCoursesByUserId);
        this.router.post("/login", this.login);
        this.router.post("/", this.createUser);
        this.router.put("/:id", authenticate({ secret: new constants_1.Constants().apiSecret }), this.editUser);
    }
}
exports.UserController = UserController;
const userController = new UserController();
userController.init();
exports.default = userController.router;
