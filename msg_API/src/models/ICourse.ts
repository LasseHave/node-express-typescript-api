import { IUser } from "./index";

export interface ICourse {
    created: Date;
    lastUpdated: Date;
    courseName: String;
    courseDescription: String;
    semester: Number;
    examDate: Date;
    members: IUser[];

}
