import * as express from "express";
import * as path from "path";
import * as fs from "fs";

import swaggerJSDoc = require("swagger-jsdoc");
import swaggerUi = require("swagger-ui-express");
import mergeYaml = require("merge-yaml");

export class Swagger {

    public options: any;
    public swaggerSpec: any;

    public readFolder(folder: string): any {
        this.swaggerSpec = JSON.parse(fs.readFileSync(folder + "/index.json", "utf8"));
        this.addPropertyFromFiles(folder + "/paths", "paths", this.swaggerSpec);
        this.addPropertyFromFiles(folder + "/definitions", "definitions", this.swaggerSpec);
    }

    public publish(app: express.Application) {
        // tslint:disable-next-line:variable-name
        let __this = this;
        app.get("/api-docs.json", function (req, res) {
            res.setHeader("Content-Type", "application/json");
            res.send(__this.swaggerSpec);
        });
        app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(this.swaggerSpec));
    }

    private addPropertyFromFiles(folder: string, propertyName: string, object: any) {
        object[propertyName] = {};
        let pathsFiles = fs.readdirSync(folder);
        pathsFiles.forEach((file) => {
            if (path.extname(file) === ".json") {
                let specs = JSON.parse(fs.readFileSync(folder + "/" + file, "utf8"));
                Object.keys(specs).forEach((key) => {
                    let value = specs[key];
                    object[propertyName][key] = value;
                });
            }});
    }
}
