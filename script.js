const quizData = [
    {
        question: "You're 4th place right now in a race. What place will you be in when you pass the person in 3rd place?",
        a: "1st",
        b: "2nd",
        c: "3rd",
        d: "None of the above",
        correctAnswer: "b"

    },
    {
        question: "How many months have 28 days?",
        a: "1",
        b: "2",
        c: "3",
        d: "None of the above",
        correctAnswer: "a"

    },
    {
        question: "How many 0.5cm slices can you cut from a bread that is 25cm long?",
        a: "50",
        b: "25",
        c: "39",
        d: "None of the above",
        correctAnswer: "c"

    },
    {
        question: "The answer is really big",
        a: "THE ANSWER",
        b: "Really big",
        c: "An elephant",
        d: "None of the above",
        correctAnswer: "b"

    },
    {
        question: "Divide 30 by half and add ten",
        a: "40.5",
        b: "50",
        c: "70",
        d: "None of the above",
        correctAnswer: "b"

    }
];


const quiz = document.getElementById('quiz')
const answerEls = document.querySelectorAll('.sol')
const questionEl = document.getElementById('question')
const a_t = document.getElementById('a_t')
const b_t = document.getElementById('b_t')
const c_t = document.getElementById('c_t')
const d_t = document.getElementById('d_t')
const submitbtn = document.getElementById('submit')


let currentQuiz = 0
let score = 0

runQuiz()

function runQuiz() {

    unselectSol()

    const currentQuizData = quizData[currentQuiz]

    questionEl.innerText = currentQuizData.question
    a_t.innerHTML = currentQuizData.a
    b_t.innerHTML = currentQuizData.b
    c_t.innerHTML = currentQuizData.c
    d_t.innerHTML = currentQuizData.d

}

function unselectSol() {
    answerEls.forEach(answerEl => answerEl.checked = false)
}

function returnSel() {
    let sol
    answerEls.forEach(answerEl => {
        if (answerEl.checked) {
            sol = answerEl.id
        }
    })
    return sol
}


submitbtn.addEventListener('click', () => {
    const sol = returnSel()
    if (sol) {
        if (sol === quizData[currentQuiz].correctAnswer) {
            score += 1
        }

        currentQuiz += 1

        if (currentQuiz < quizData.length) {
            runQuiz()
        } else {
            quiz.innerHTML =
                `<h2>You answered ${score}/${quizData.length} questions correctly</h2>
            
            <button onclick= "location.reload()">Reload</button>`
        }
    }
})


