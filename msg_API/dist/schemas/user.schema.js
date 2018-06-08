"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const ICourse = require("../models/icourse");
const IStudy = require("../models/istudy");
exports.UserSchema = new mongoose.Schema({
    created: Date,
    lastUpdated: Date,
    firstName: String,
    lastName: String,
    userName: String,
    password: String,
    age: Number,
    study: IStudy,
    courses: [ICourse],
});
exports.UserSchema.pre("save", function (next) {
    let now = new Date();
    if (!this.created) {
        this.created = now;
    }
    this.lastUpdated = now;
    next();
});
exports.UserSchema.methods.fullName = function () {
    return (this.firstName.trim() + " " + this.lastName.trim());
};
exports.User = mongoose.model("user", exports.UserSchema);
