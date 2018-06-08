"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai = require("chai");
const chaiHttp = require("chai-http");
const App_1 = require("../App");
const constants_1 = require("../constants/constants");
// use q promises
global.Promise = require("q").Promise;
// import mongoose
const mongoose = require("mongoose");
// use q library for mongoose promise
mongoose.Promise = global.Promise;
// connect to mongoose and create model
let dbConstants = new constants_1.Constants();
let connection = mongoose.createConnection(dbConstants.dbConnString);
// require chai and use should() assertions
chai.use(chaiHttp);
chai.should();
const expect = chai.expect;
describe("user", function () {
    describe("get()", function () {
        it("should be json", () => {
            return chai.request(App_1.default).get(dbConstants.apiBasePath + "users")
                .then(res => {
                expect(res.type).to.eql("application/json");
            });
        });
    });
});
