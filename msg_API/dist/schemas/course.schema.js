"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const IUser = require("../models/IUser");
exports.CourseSchema = new mongoose.Schema({
    created: Date,
    lastUpdated: Date,
    courseName: String,
    courseDescription: String,
    semester: Number,
    examDate: Date,
    members: [IUser]
});
exports.CourseSchema.pre("save", function (next) {
    let now = new Date();
    if (!this.created) {
        this.created = now;
    }
    this.lastUpdated = now;
    next();
});
exports.Course = mongoose.model("course", exports.CourseSchema);
