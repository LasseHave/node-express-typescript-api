import * as mongoose from "mongoose";
import * as mongodb from "mongodb";
import { IUser } from "../models/IUser";
import * as ICourse from "../models/icourse";
import * as IStudy from "../models/istudy";
export interface IUserModel extends IUser, mongoose.Document {
    fullName(): string;
}

export let UserSchema: mongoose.Schema = new mongoose.Schema({
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
UserSchema.pre("save", function (next) {
    let now = new Date();
    if (!this.created) {
        this.created = now;
    }
    this.lastUpdated = now;
    next();
});
UserSchema.methods.fullName = function (): string {
    return (this.firstName.trim() + " " + this.lastName.trim());
};

export const User: mongoose.Model<IUserModel> = mongoose.model<IUserModel>("user", UserSchema);
