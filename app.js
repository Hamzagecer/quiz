const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];

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

function getResult(element) {
    const id = parseInt(element.id);
    //get the answer by comparing the id of  clicked option 
    if (id === currentQuestion.answer) {
        //set the green color to the correct option 
        element.classList.add("correct");
    } else {
        element.classList.add("wrong");
        //if the answer is incorrect the show the correct option by adding green color the correct option 
        const optionLen = optionContainer.children.length;
        for (let i = 0; i < optionLen; i++) {
            if (parseInt(optionContainer.children[i].id) === currentQuestion.answer) {
                optionContainer.children[i].classList.add("correct");
            }
        }
    }
    unclickableOptions();
}

//make all the options uncklicable once the user select  a option (RESTRICT THE USER TO CHANGE THE OPTION AGAIN )
function unclickableOptions() {
    const optionLen = optionContainer.children.length;
    for (let i = 0; i < optionLen; i++) {
        optionContainer.children[i].classList.add("already-answered");
    }
}

function next() {
    if (questionCounter === quiz.length) {
        console.log("quiz over")
    } else {
        getNewQuestion();
    }
}

window.onload = function () {
    //first we will set all questions in availableQuestions Array
    setAvailableQuestions();
    //second we will call getNewQuestion(); function
    getNewQuestion();
}