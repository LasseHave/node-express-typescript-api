"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.StudySchema = new mongoose.Schema({
    created: Date,
    lastUpdated: Date,
    studyName: String,
    startYear: Number,
    bachelor: Boolean // False will equal Master
});
exports.StudySchema.pre("save", function (next) {
    let now = new Date();
    if (!this.created) {
        this.created = now;
    }
    this.lastUpdated = now;
    next();
});
exports.Study = mongoose.model("study", exports.StudySchema);
