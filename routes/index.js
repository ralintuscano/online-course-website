const quizRoutes = require('./quizQuestions');


const constructorMethod = (app) => {
    app.use('/', quizRoutes);


    app.use('*', (req, res) => {
        res.status(404).json({ error: 'Not found' });
    });
};

module.exports = constructorMethod;