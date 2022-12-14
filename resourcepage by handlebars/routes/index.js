const courselist = require('./courselist');

const constructorMethod = (app) => {
    app.use('/', courselist);
  
  };
  
  module.exports = constructorMethod;