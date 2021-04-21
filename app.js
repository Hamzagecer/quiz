//question array

const quiz = [{
        q: '3 x 4 = ?',
        options: ['23', '12', '15', '18'],
        answer: 1
    },
    {
        q: '9 x 9 = ?',
        options: ['78', '82', '88', '81'],
        answer: 3
    },

    {
        q: '7 x 7 = ?',
        options: ['42', '46', '52', '49'],
        answer: 3
    },

    {
        q: '5 x 9 = ?',
        options: ['45', '35', '40', '55'],
        answer: 0
    },

    {
        q: '7 x 8 = ?',
        options: ['45', '63', '56', '54'],
        answer: 2
    },

    {
        q: '6 x 4 = ?',
        options: ['24', '18', '21', '21'],
        answer: 0
    },

    {
        q: '9 x 7 = ?',
        options: ['72', '64', '81', '63'],
        answer: 3
    },

    {
        q: '8 x 8 = ?',
        options: ['64', '72', '81', '67'],
        answer: 0
    },

    {
        q: '7 x 5 = ?',
        options: ['25', '35', '15', '21'],
        answer: 1
    },

    {
        q: '6 x 8 = ?',
        options: ['44', '20', '48', '46'],
        answer: 2
    }
]


const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answersIndicatorContainer = document.querySelector(".answers-indicator");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;
let attempt = 0;
var deger;
var saniye = 11;
//push the question into availableQuestion Array

function setAvailableQuestions() {
    const totalQuestions = quiz.length;
    for (let i = 0; i < totalQuestions; i++) {
        availableQuestions.push(quiz[i])
    }
}
//set question number and question and options
function getNewQuestion() {
    //set question number
    questionNumber.innerHTML = "Question " + (questionCounter + 1) + " of " + quiz.length;

    //set question text
    //get random question

    const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.q;
    //get the  position of 'questionIndex' from the availableQuestion Array;
    const index1 = availableQuestions.indexOf(questionIndex);
    //remove the 'questionIndex' from the availableQuestion Array, so that the question does not repeat
    availableQuestions.splice(index1, 1);

    //set options
    //get the lenght of options
    const optionLen = currentQuestion.options.length
    //push options into  availableOptions Array
    for (let i = 0; i < optionLen; i++) {
        availableOptions.push(i)
        //create options in html
    }
    optionContainer.innerHTML = '';
    let animationDelay = 0.15;
    for (let i = 0; i < optionLen; i++) {
        const optonIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
        const index2 = availableOptions.indexOf(optonIndex);
        availableOptions.splice(index2, 1);
        const option = document.createElement("div");
        option.innerHTML = currentQuestion.options[optonIndex];
        option.id = optonIndex;
        option.style.animationDelay = animationDelay + 's';
        animationDelay = animationDelay + 0.15;
        option.className = "option";
        optionContainer.appendChild(option)
        option.setAttribute("onclick", "getResult(this)");
    }


    questionCounter++

}

function saniyeBaslat() {
    saniye--;
    if (saniye > 0) {
        document.getElementById('saniye').innerHTML = saniye;
    } else if (saniye == 0) {
        updateAnswerIndicator("wrong");
        getNewQuestion();
        saniye = 11;
    } else {
        window.clearInterval(deger);
    }
}
var deger = window.setInterval('saniyeBaslat()', 1000);


function getResult(element) {
    const id = parseInt(element.id);
    //get the answer by comparing the id of  clicked option 
    if (id === currentQuestion.answer) {
        //set the green color to the correct option 
        element.classList.add("correct");
        //add the indicator to correct mark
        updateAnswerIndicator("correct");
        correctAnswers++;

    } else {
        element.classList.add("wrong");
        //add the indicator to wrong mark
        updateAnswerIndicator("wrong");

        //if the answer is incorrect the show the correct option by adding green color the correct option 
        const optionLen = optionContainer.children.length;
        for (let i = 0; i < optionLen; i++) {
            if (parseInt(optionContainer.children[i].id) === currentQuestion.answer) {
                optionContainer.children[i].classList.add("correct");
            }
        }
    }
    attempt++;
    unclickableOptions();
}

//make all the options uncklicable once the user select  a option (RESTRICT THE USER TO CHANGE THE OPTION AGAIN )
function unclickableOptions() {
    const optionLen = optionContainer.children.length;
    for (let i = 0; i < optionLen; i++) {
        optionContainer.children[i].classList.add("already-answered");
    }
}

function answersIndicator() {
    answersIndicatorContainer.innerHTML = '';
    const totalQuestions = quiz.length;
    for (let i = 0; i < totalQuestions; i++) {
        const indicator = document.createElement("div");
        answersIndicatorContainer.appendChild(indicator);
    }
}

function updateAnswerIndicator(markType) {
    answersIndicatorContainer.children[questionCounter - 1].classList.add(markType)
}

function next() {
    if (questionCounter === quiz.length) {

        quizOver();
    } else {
        getNewQuestion();
    }
    saniye = 11;
}

function quizOver() {
    //hide quiz Box
    quizBox.classList.add("hide");
    //show result Box
    resultBox.classList.remove("hide");
    quizResult();
}
// get the quiz Result
function quizResult() {
    resultBox.querySelector(".total-question").innerHTML = quiz.length;
    resultBox.querySelector(".total-attempt").innerHTML = attempt;
    resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
    resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswers;
    const percentage = (correctAnswers / quiz.length) * 100;
    resultBox.querySelector(".percentage").innerHTML = percentage.toFixed(2) + "%";
    resultBox.querySelector(".total-score").innerHTML = correctAnswers + " / " + quiz.length;
}

function resetQuiz() {
    questionCounter = 0;
    correctAnswers = 0;
    attempt = 0;
    saniye = 11;
}

function tryAgainQuiz() {
    //hide the resultBox
    resultBox.classList.add("hide");
    //show the quizBox
    quizBox.classList.remove("hide");
    resetQuiz();
    startQuiz();
}

function goToHome() {
    //hide result Box
    resultBox.classList.add("hide");
    //show home box
    homeBox.classList.remove("hide");
    resetQuiz();
}


//#### STARTING POINT #### 

function startQuiz() {

    //hide home Box
    homeBox.classList.add("hide");
    //show quiz Box
    quizBox.classList.remove("hide");


    //first we will set all questions in availableQuestions Array
    setAvailableQuestions();
    //second we will call getNewQuestion(); function
    getNewQuestion();
    //to create indicator of answers    
    answersIndicator();
}

window.onload = function () {
    saniye = 11;
    homeBox.querySelector(".total-question").innerHTML = quiz.length;
}