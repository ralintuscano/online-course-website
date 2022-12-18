const mongoCollections = require('../config/mongoCollections');
const quizQuestions = mongoCollections.quizQuestions
const validation = require('../helpers')

async function addQuestion(
    courseId,
    question,
    a,
    b,
    c,
    d,
    correctAnswer
) {
    if (!courseId) {
        throw "Error: Course Id not provided"
    }

    courseId = courseId.trim()

    a = validation.checkOption(a)
    b = validation.checkOption(b)
    c = validation.checkOption(c)
    d = validation.checkOption(d)
    correctAnswer = validation.checkOption(correctAnswer)

    const quizQuestionsCollection = await quizQuestions()

    let questionObj = {
        question: question,
        a: a,
        b: b,
        c: c,
        d: d,
        correctAnswer: correctAnswer
    }

    let currentCourse = await quizQuestionsCollection.findOne({ courseId: courseId })

    if (!currentCourse) {
        let questionArr = [questionObj]
        let newQuestion = {
            courseId: courseId,
            quizQuestions: questionArr
        }

        const newInsert = await quizQuestionsCollection.insertOne(newQuestion)
    } else {
        let currentCourseQuiz = currentCourse['quizQuestions']
        currentCourseQuiz.push(questionObj)

        let newupdateQuiz = {
            quizQuestions: currentCourseQuiz,
        }
        const updateInfo = await quizQuestionsCollection.updateOne({ courseId: courseId }, { $set: newupdateQuiz })
        if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
            throw 'Update failed';
    }
    return true
}


async function getQuiz(
    courseId,
) {
    if (!courseId) {
        throw "Error: Course Id not provided"
    }
    const quizQuestionsCollection = await quizQuestions()
    const courseQuiz = await quizQuestionsCollection.findOne({ courseId: courseId })
    if (!courseQuiz) throw "Quiz for this course not found"
    return courseQuiz
}


module.exports = {
    addQuestion: addQuestion,
    getQuiz: getQuiz
}