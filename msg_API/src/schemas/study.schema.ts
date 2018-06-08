import * as mongoose from "mongoose";
import * as mongodb from "mongodb";
import { IStudy } from "../models/IStudy";
export interface IStudyModel extends IStudy, mongoose.Document {}

export let StudySchema: mongoose.Schema = new mongoose.Schema({
    created: Date,
    lastUpdated: Date,
    studyName: String,
    startYear: Number,
    bachelor: Boolean // False will equal Master
});
StudySchema.pre("save", function (next) {
    let now = new Date();
    if (!this.created) {
        this.created = now;
    }
    this.lastUpdated = now;
    next();
});

export const Study: mongoose.Model<IStudyModel> = mongoose.model<IStudyModel>("study", StudySchema);
