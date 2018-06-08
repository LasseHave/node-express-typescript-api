/**
 * db_test.js
 * For populating a test database for API
 */

// All tables (collections for database)
// User table
db.getCollection("users").remove({});
db.createCollection("users");

var userCollection = db.getCollection("users")
var Alice = {
    _id: ObjectId("52ffc33cd85242f436000001"),
    created: new Date(),
    lastUpdated: new Date(),
    firstName: "Alice",
    lastName: "McDonald",
    username: "alice",
    password: "$2a$10$ezz6pmfLxormsT08g6pHX.mzEv4qQe1jv0x/.e9qheEAVAjkiq54y",
    age: 22,
    study: "52ffc33cd85242f436000332",
    courses: ["52ffc33cd85242f436000555"]
};

var Bob = {
    _id: ObjectId("52ffc33cd85242f436000002"),
    created: new Date(),
    lastUpdated: new Date(),
    firstName: "Bob",
    lastName: "McDonald",
    username: "bobmcd",
    password: "$2a$10$ezz6pmfLxormsT08g6pHX.mzEv4qQe1jv0x/.e9qheEAVAjkiq54y",
    age: 22,
    study: "52ffc33cd85242f436000332",
    courses: ["52ffc33cd85242f436000555"]
};

db.users.insertOne(Alice);
db.users.insertOne(Bob);

// Course table
db.getCollection("courses").remove({});
db.createCollection("courses");

var courseCollection = db.getCollection("courses")
courseCollection.insertOne({
    _id: ObjectId("52ffc33cd85242f436000555"),
    created: new Date(),
    lastUpdated: new Date(),
    courseName: "Node Programming",
    courseDescription: "Learn how to program APIs in a faster way",
    study: "52ffc33cd85242f436000333",
    members: [ObjectId("52ffc33cd85242f436000001"), ObjectId("52ffc33cd85242f436000002")]
});


// Study table
db.getCollection("studies").remove({});
db.createCollection("studies");

var studyCollection = db.getCollection("studies")
studyCollection.insertOne({
    _id: ObjectId("52ffc33cd85242f436000333"),
    created: new Date(),
    lastUpdatedd: new Date(),
    studyName: "Computer Engineering",
    startYear: 2017,
    bachelor: false, // False will equal Master
});
