//Here you will require route files and export the constructor method as shown in lecture code and worked in previous labs.

const routesAPI = require("./routesAPI");
const student = require('./student');


const constructorMethod = (app) => {


  app.use('/student',student);
  app.use('/', routesAPI);
  app.use('*', (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;
