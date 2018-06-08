"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
const swaggerUi = require("swagger-ui-express");
class Swagger {
    readFolder(folder) {
        this.swaggerSpec = JSON.parse(fs.readFileSync(folder + "/index.json", "utf8"));
        this.addPropertyFromFiles(folder + "/paths", "paths", this.swaggerSpec);
        this.addPropertyFromFiles(folder + "/definitions", "definitions", this.swaggerSpec);
    }
    publish(app) {
        // tslint:disable-next-line:variable-name
        let __this = this;
        app.get("/api-docs.json", function (req, res) {
            res.setHeader("Content-Type", "application/json");
            res.send(__this.swaggerSpec);
        });
        app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(this.swaggerSpec));
    }
    addPropertyFromFiles(folder, propertyName, object) {
        object[propertyName] = {};
        let pathsFiles = fs.readdirSync(folder);
        pathsFiles.forEach((file) => {
            if (path.extname(file) === ".json") {
                let specs = JSON.parse(fs.readFileSync(folder + "/" + file, "utf8"));
                Object.keys(specs).forEach((key) => {
                    let value = specs[key];
                    object[propertyName][key] = value;
                });
            }
        });
    }
}
exports.Swagger = Swagger;
