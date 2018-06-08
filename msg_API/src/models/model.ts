import { Model } from "mongoose";
import { IUserModel } from "../schemas/user.schema";

export interface IModel {
  user: Model<IUserModel>;
}
