const startButton = document.getElementById("start-btn")
const nextButton = document.getElementById("next-btn")
const highScoresButton = document.getElementById("high-scores-btn")
const enterName = document.getElementById("enterName")
const restartBtn = document.getElementById("restartBtn")
const answerBtn = document.getElementById("answer-buttons")
const scoresList = document.getElementById("scoresList")
const submitName = document.getElementById("submitName")
const inputName = document.getElementById("inputName")
const highScores = document.getElementById("highScores")
const timer = document.getElementById("timer")
const questionContainerElement = document.getElementById("question-container")
const questionElement = document.getElementById("question")
const answerButtonsElement = document.getElementById("answer-buttons")

let shuffledQuestions, currentQuestionIndex

let timeLeft, timerVariable

var highScoresList = JSON.parse(localStorage.getItem("highScores")) || []
console.log(highScoresList)

startButton.addEventListener("click", startGame)
nextButton.addEventListener("click", setNextQuestion)
submitName.addEventListener("click", addNameHighScores)
restartBtn.addEventListener("click", startGame)
highScoresButton.addEventListener("click", highScoresBtn)

function startTimer(){
    timeLeft = 60
    timerVariable = setInterval(function(){
        timeLeft--
        timer.innerHTML = timeLeft
        if (timeLeft <= 0) {
        endTimer()}
    }, 1000)
    
}
function endTimer() {
    clearInterval(timerVariable)
}
function startGame() {
    startTimer();
    console.log("started");
    startButton.classList.add("hide");
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove("hide")
    setNextQuestion();
    answerBtn.classList.remove("hide")
}

function highScoresBtn() {
    resetState()
    endGame()
    
    startButton.classList.add("hide")
    questionContainerElement.classList.add("hide")
    highScores.classList.remove("hide")
}



function setNextQuestion() {
    resetState()
    currentQuestionIndex++
    enterName.classList.add("hide")
    highScores.classList.add("hide")
    questionContainerElement.classList.add("hide")
    // nextButton.classList.add("hide")
    // show high scores 
    if (currentQuestionIndex == shuffledQuestions.length + 1) {
        highScores.classList.remove("hide")
    } // show name input
    else if (currentQuestionIndex == shuffledQuestions.length) {
        enterName.classList.remove("hide")
        endGame()
    // } 
    // else if (shuffledQuestions.length > currentQuestionIndex + 1) {
    //     nextButton.classList.remove("hide") 
    } else {
        questionContainerElement.classList.remove("hide")
        // startButton.innerText = "Restart"
        // startButton.classList.remove("hide")
        let question = shuffledQuestions[currentQuestionIndex]
        questionElement.innerText = question.question
        question.answers.forEach(answer => {
        const button = document.createElement("button")
        button.innerText = answer.text
        button.classList.add("btn")
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
        answerButtonsElement.appendChild(button)
    }); 
    }
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add("hide")
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild
        (answerButtonsElement.firstChild)
    }
}
function endGame(){
    endTimer()
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    if (!correct) {
        timeLeft -= 10
    }
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    setTimeout(setNextQuestion, 200)
    // setNextQuestion()
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if(correct) {
        element.classList.add("correct")

    } else {
        element.classList.add("wrong")
    }
}

function clearStatusClass(element) {
    element.classList.remove("correct")
    element.classList.remove("wrong")
}

function addNameHighScores() {
    let name = inputName.value 
    console.log(name)
    var playerObject = { 
        name: name,
        score: timeLeft
    }
    highScoresList.push(playerObject)
    localStorage.setItem("highScores", JSON.stringify(highScoresList));
    scoresList.innerHTML = ""
    highScoresList.forEach(function(item){
        var html = `<p>${item.name} ; ${item.score}</p>`
        scoresList.innerHTML += html   
    })
    console.log(highScoresList)
    setNextQuestion()
}

var questions = [
    {
        question: "Who invented Javascript?",
        answers: [
            {text: "Douglas CrockFord", correct: false},
            {text: "Sheryl SandBerg", correct: false},
            {text: "Brendan Eich", correct: true},
            {text: "Steve Jobs", correct: false}
        ]
    },
    {
        question: "Inside which HTML element do we put the Javascript?",
        answers: [
            {text: "<javascript>", correct: false},
            {text: "<script>", correct: true},
            {text: "<title>", correct: false},
            {text: "<link>", correct: false}
        ]
    },
    {
        question: "what does || in javascript",
        answers: [
            {text: "and", correct: true},
            {text: "if", correct: false},
            {text: "else", correct: false},
            {text: "or", correct: true}
        ]
    },
    {
        question: "How does a FOR loop start?",

        
        answers: [
            {text: "for i = 1 to 5", correct: false},
            {text: "for (var i = 0; i < 10; i++)", correct: true},
            {text: "for (var i<=5; i++)", correct: false},
            {text: "for (i=0; i <= 5)", correct: false}
        ]
    },
    {
        question: "What sign represents jQuery?",
        answers: [
            {text: "@", correct: false},
            {text: "$", correct: true},
            {text: "!", correct: false},
            {text: "%", correct: false}
        ]
    },
    {
        question: "What is the correct way to write an array?",
        answers: [
            {text: "var colors = {\"red\", \"blue\", \"yellow\", \"orange\"}", correct: false},
            {text: "var colors = [red, blue, yellow, orange]", correct: false},
            {text: "var colors = [red blue yellow orange]", correct: false},
            {text: "var colors = [\"red\", \"blue\", \"yellow\", \"orange\"]", correct: true}
        ]
    },
    {
        question: "How can you add a one line comment in Javascript?",
        answers: [
            {text: "//comment", correct: true},
            {text: "\"comment\"", correct: false},
            {text: "<!--comment--!>", correct: false},
            {text: "..comment", correct: false}
        ]
    },
    {
        question: "what is 2 + 2?",
        answers: [
            {text: "4", correct: true},
            {text: "50", correct: false},
            {text: "6", correct: false},
            {text: "16", correct: false}
        ]
    }
]