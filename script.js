var question = document.querySelector('#question');
var choices = Array.from(document.querySelectorAll('.choice-text'));
var progressText = document.querySelector('#progressText');
var scoreText = document.querySelector('#score');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let question = [
    {
    question: "Which of the following is a disadvantage of using JavaScript?",
    choice1: "Client-side JavaScript does not allow the reading or writing of files",
    choice2: "JavaScript can not be used for Networking applications because there is no such support available",
    choice3: "JavaScript doesn't have any multithreading or multiprocess capabilities",
    choice4: "All of the above",
    answer: "All of the above",
    },
    {
    question: "How can you get the type of arguments passed to a function?",
    choice1: "using typeof operator",
    choice2: "using getType function",
    choice3: "Both of the above",
    choice4: "None of the above",
    answer: "using typeof operator",
    },
    {
    question: "Which built-in method returns the length of the string?",
    choice1: "length()",
    choice2: "size()",
    choice3: "index()",
    choice4: "None of the above",
    answer: "length()",
    },
    {
    question: "Which of the following function of Boolean object returns a string of either 'true' or 'false' depending upon the value of the object?",
    choice1: "toSource()",
    choice2: "valueOf()",
    choice3: "toString()",
    choice4: "None of the above",
    answer: "toString()",
    },
    {
    question: "Which of the following function of String object executes the search for a match between a regular expression and a specified string?",
    choice1: "concat()",
    choice2: "match()",
    choice3: "replace()",
    choice4: "search()",
    answer: "search()",
    },
]

var SCORE_POINTS = 100
var MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestions()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('index3.html')
    }

    questionCounter++
    progressText.innerText = 'Question ${questionCounter} of ${MAX_QUESTIONS}'
    progressBarFull.style.width = '${(questionCounter/MAX_QUESTIONS) * 100}%'

    var questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        var number = choice.dataset ['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionIndex, 1)

    acceptingAnswers = true
}

choice.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return
       
        acceptingAnswers = false
        var selectedChoice = e.target
        var selectedAnswer = selectedChoice.dataset('number')
        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct':
        "incorrect"

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }
        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply)
        getNewQuestion()
        },1000)
   })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()