import "mocha";
import * as chai from "chai";
import chaiHttp = require("chai-http");
import { IUser } from "../models/";
import { IUserModel, UserSchema } from "../schemas/user.schema";
import app from "../App";
import { Constants } from "../constants/constants";
// use q promises
global.Promise = require("q").Promise;

// import mongoose
import mongoose = require("mongoose");

// use q library for mongoose promise
mongoose.Promise = global.Promise;

// connect to mongoose and create model
let dbConstants = new Constants();
let connection: mongoose.Connection = mongoose.createConnection(dbConstants.dbConnString);

// require chai and use should() assertions
chai.use(chaiHttp);
chai.should();
const expect = chai.expect;

describe("user", function() {
  describe("get()", function () {
    it("should be json", () => {
        return chai.request(app).get(dbConstants.apiBasePath + "studies")
        .then(res => {
          expect(res.type).to.eql("application/json");
        });
      });
  });
});
