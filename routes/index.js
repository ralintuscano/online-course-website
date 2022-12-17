//Here you will require route files and export the constructor method as shown in lecture code and worked in previous labs.

const userRoutes = require("./routesAPI");
const instructorRoutes = require("./Instructor");

const constructorMethod = (app) => {
  app.use("/", userRoutes);
  app.use("/instructor", instructorRoutes);
  app.use("*", (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;
