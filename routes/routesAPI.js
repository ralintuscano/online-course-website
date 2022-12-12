//require express, express router and bcrypt as shown in lecture code
const express = require('express');
const router = express.Router();

const data = require("./../data/index");

const users = data.users;

// router
//   .route('/')
//   .get(async (req, res) => {
//     if(req.session.user){
//       res.redirect('/protected')
//     }
//     res.render('userLogin', {});
//   })

router.get('/static', (req, res) => {
  res.render('calculator/static', {});
});

router
  .route('/')
  .get(async (req, res) => {
    var questions = [
      {
        question: "What is 10/2?",
        answers: {
          a: '3',
          b: '5',
          c: '115'
        },
        correctAnswer: 'b'
      },
      {
        question: "What is 30/3?",
        answers: {
          a: '3',
          b: '5',
          c: '10'
        },
        correctAnswer: 'c'
      }
    ];
   
    res.render('student/quizPage', {questions, isLoggedIn: true, isInstructor: true});
  })

router
  .route('/register')
  .get(async (req, res) => {
    //code here for GET
    //if authenticated, send to /protected
    //render view with register and , links to / and has the text "Already have an account? Click here to log-in"
    if(req.session.user){
      return res.redirect('/protected')
    }
     res.render('userRegister',{});
  })
  .post(async (req, res) => {
    //code here for POST
    try {

      const username = req.body.usernameInput;
      const password = req.body.passwordInput;

      const result = await users.createUser(username,password);

      if(result?.code)
        res.send('Internal Server Error').status(res.code);
      if(result.errMsg.length)
        return res.status(400).render('userRegister', {error: result.errMsg});
      
      if(result.insertedUser)
        return res.redirect('/');

    } catch (error) {
      res.send(error).status(500);
    }
  })
 
router
  .route('/login')
  .post(async (req, res) => {
    //code here for POST

    try {
      const usernme = req.body.usernameInput;
      const password = req.body.passwordInput;
      const result = await users.checkUser(usernme,password);

      if(result.authenticatedUser){
        req.session.user = req.body.usernameInput;
        return res.redirect('/protected');
      }
      res.status(400).render('userLogin', {error: result.errMsg});

    } catch (error) {
      res.send(error).status(500);
    }
  })

router
  .route('/protected')
  .get(async (req, res) => {
  
    res.render('private', {username: req.session.user, dateTime: new Date().toUTCString()});
   
  })

router
  .route('/logout')
  .get(async (req, res) => {
    //code here for GET
    req.session.destroy();
    res.render('logout');
  })

  module.exports = router;
