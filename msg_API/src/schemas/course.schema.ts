import * as mongoose from "mongoose";
import { ICourse } from "../models/ICourse";
import * as IUser from "../models/IUser";
export interface ICourseModel extends ICourse, mongoose.Document {
}

export let CourseSchema: mongoose.Schema = new mongoose.Schema({
    created: Date,
    lastUpdated: Date,
    courseName: String,
    courseDescription: String,
    semester: Number,
    examDate: Date,
    members: [IUser]
});
CourseSchema.pre("save", function (next) {
    let now = new Date();
    if (!this.created) {
        this.created = now;
    }
    this.lastUpdated = now;
    next();
});

export const Course: mongoose.Model<ICourseModel> = mongoose.model<ICourseModel>("course", CourseSchema);
