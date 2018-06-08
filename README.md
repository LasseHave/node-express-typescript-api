# A NodeJS TS Web API #
Boilerplate project with:
API: NodeJS with TS (gulp BE)
DB: Mongo, selfhosted

### Prerequisites ###

A machine, with node, gulp, mongod installed. 
If not, install node from their website and run:
```bash
$ npm i -g mongod
$ npm i -g gulp
```

On a Mac environment run the following to setup a MongoDB if not done before
```bash
$ sudo mkdir -p /data/db
$ sudo chown -R $USER /data/db
```

### Setup ###

Before working on the API use:
```bash
$ mongod
```
Install project dependencies. cd into this folder:
```bash
$ cd /path/to/repo
$ npm install
```

And in a new terminal/command:
```bash
$ gulp watch
```
To run the API
```bash
$ npm start
```
The api will then be reachable from http://localhost:3000

Swagger is used as documentation for endpoints, can be reached at http://localhost:3000/api-docs


### System ###

The system is a structured API with controller separation in Express. It contains of three controllers:
 - Users (Students)
 - Courses
 - Study

 It is secured with Bearer Auth and shows the principle of routes that are not secured, and routes that are.