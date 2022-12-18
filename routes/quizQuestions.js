const express = require('express');
const router = express.Router();
const data = require('../data')
const quizQuestions = data.quizQuestions
const axios = require('axios')
const path = require('path')

router.get("/", async (req, res) => {
    res.sendFile(path.resolve("static/createQuiz.html"))
});

router.post("/addQuestion", async (req, res) => {
    let courseCode = String(req.body.CourseCode).trim()
    let question = String(req.body.question).trim()
    let option_a = String(req.body.option_a).trim()
    let option_b = String(req.body.option_b).trim()
    let option_c = String(req.body.option_c).trim()
    let option_d = String(req.body.option_d).trim()
    let correctAnswer = String(req.body.correct).trim()

    const quizQuestions = data.quizQuestions
    try {
        let questionAdded = quizQuestions.addQuestion(
            courseCode,
            question,
            option_a,
            option_b,
            option_c,
            option_d,
            correctAnswer
        )

        if (questionAdded) {
            res.render('success', { message: "Question Successfully added" })
        } else {
            res.render('success', { message: "Question not added" })
        }


    } catch (e) {
        res.status(400).send("An Error Occurred")
    }

})

module.exports = router;
