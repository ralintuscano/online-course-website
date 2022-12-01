const routesAPI = require('./routesAPI');


const constructorMethod = (app) => {
  app.use('/', routesAPI);

  app.use('*', (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;
