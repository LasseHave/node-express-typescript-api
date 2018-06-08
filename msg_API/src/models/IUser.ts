import { ICourse } from "./ICourse";
import { IStudy } from "./IStudy";

export interface IUser {
    created: Date;
    lastUpdated: Date;
    firstName: String;
    lastName: String;
    studyNumber: String;
    userName: String;
    password: String;
    age: Number;
    study: IStudy;
    courses: ICourse[];
}
