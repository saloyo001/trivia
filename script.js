const questions = [
    {
        question: "What is the capital of Kenya?",
        options: ["Nairobi", "Mombasa", "Kisumu", "Nakuru"],
        answer: "Nairobi"
    },
    {
        question: "Which language makes webpages interactive?",
        options: ["HTML", "CSS", "JavaScript", "SQL"],
        answer: "JavaScript"
    },
    {
        question: "Which keyword creates a variable?",
        options: ["let", "print", "show", "write"],
        answer: "let"
    },
    {
        question: "Which method adds an item to an array?",
        options: ["push()", "pop()", "join()", "slice()"],
        answer: "push()"
    },
    {
        question: "Which symbol checks strict equality?",
        options: ["=", "==", "===", "!="],
        answer: "==="
    },
    {
        question: "What is the largest planet in our solar system?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        answer: "Jupiter"
    },
    {
        question: "How many days are in a leap year?",
        options: ["364", "365", "366", "367"],
        answer: "366"
    },
    {
        question: "Which animal is known as the king of the jungle?",
        options: ["Tiger", "Lion", "Elephant", "Leopard"],
        answer: "Lion"
    },
    {
        question: "What is the chemical symbol for water?",
        options: ["CO2", "O2", "H2O", "NaCl"],
        answer: "H2O"
    },
    {
        question: "Which continent is Kenya located in?",
        options: ["Asia", "Europe", "Africa", "Australia"],
        answer: "Africa"
    },
    {
        question: "How many sides does a hexagon have?",
        options: ["Five", "Six", "Seven", "Eight"],
        answer: "Six"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Saturn", "Mercury"],
        answer: "Mars"
    },
    {
        question: "What is 12 multiplied by 8?",
        options: ["84", "88", "96", "108"],
        answer: "96"
    },
    {
        question: "Which ocean is the largest?",
        options: ["Atlantic", "Indian", "Arctic", "Pacific"],
        answer: "Pacific"
    },
    {
        question: "Who wrote Romeo and Juliet?",
        options: [
            "Charles Dickens",
            "William Shakespeare",
            "Mark Twain",
            "Jane Austen"
        ],
        answer: "William Shakespeare"
    },
    {
        question: "Which gas do plants absorb from the atmosphere?",
        options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"],
        answer: "Carbon dioxide"
    },
    {
        question: "How many minutes are in one hour?",
        options: ["30", "45", "60", "100"],
        answer: "60"
    },
    {
        question: "Which is the fastest land animal?",
        options: ["Lion", "Cheetah", "Horse", "Leopard"],
        answer: "Cheetah"
    },
    {
        question: "What is the currency of Japan?",
        options: ["Yuan", "Won", "Yen", "Dollar"],
        answer: "Yen"
    },
    {
        question: "Which organ pumps blood around the human body?",
        options: ["Brain", "Lungs", "Liver", "Heart"],
        answer: "Heart"
    },
    {
        question: "How many colors are traditionally in a rainbow?",
        options: ["Five", "Six", "Seven", "Eight"],
        answer: "Seven"
    },
    {
        question: "Which language is mainly used to style webpages?",
        options: ["HTML", "CSS", "Python", "SQL"],
        answer: "CSS"
    },
    {
        question: "What does CPU stand for?",
        options: [
            "Central Processing Unit",
            "Computer Personal Unit",
            "Central Program Utility",
            "Control Processing User"
        ],
        answer: "Central Processing Unit"
    },
    {
        question: "Which country is famous for the Great Pyramids of Giza?",
        options: ["Greece", "Egypt", "India", "Mexico"],
        answer: "Egypt"
    },
    {
        question: "What is the boiling point of water at sea level?",
        options: ["50°C", "75°C", "100°C", "150°C"],
        answer: "100°C"
    },
    {
        question: "Which data structure stores items in order using indexes?",
        options: ["Array", "Boolean", "Function", "Condition"],
        answer: "Array"
    },
    {
        question: "What is the opposite of a light-year getting its name from?",
        options: [
            "A measure of time",
            "A measure of distance",
            "A measure of speed",
            "A measure of weight"
        ],
        answer: "A measure of distance"
    },
    {
        question: "Which sport uses a racket and a shuttlecock?",
        options: ["Tennis", "Badminton", "Cricket", "Hockey"],
        answer: "Badminton"
    },
    {
        question: "What is the square root of 81?",
        options: ["7", "8", "9", "10"],
        answer: "9"
    },
    {
        question: "Which method selects an HTML element by its ID?",
        options: [
            "document.getElementById()",
            "document.getArray()",
            "document.findClass()",
            "document.getTag()"
        ],
        answer: "document.getElementById()"
    }
];

const quiz = document.getElementById("quiz");
const timer = document.getElementById("timer");
const scoreDisplay = document.getElementById("score");
const feedback = document.getElementById("feedback");

const startButton = document.getElementById("start-button");
const answerButton = document.getElementById("answer-button");
const nextButton = document.getElementById("next-button");
const restartButton = document.getElementById("restart-button");

let shuffledQuestions = [];
let questionNumber = 0;
let score = 0;
let timeLeft = 60;
let gameTimer;
let gameStarted = false;

startButton.addEventListener("click", startGame);
answerButton.addEventListener("click", checkAnswer);
nextButton.addEventListener("click", nextQuestion);
restartButton.addEventListener("click", startGame);

function shuffleQuestions() {
    shuffledQuestions = [...questions];

    for (let i = shuffledQuestions.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));

        const temporary = shuffledQuestions[i];
        shuffledQuestions[i] = shuffledQuestions[randomIndex];
        shuffledQuestions[randomIndex] = temporary;
    }

    shuffledQuestions = shuffledQuestions.slice(0, 5);
}

function startGame() {
    clearInterval(gameTimer);

    shuffleQuestions();

    questionNumber = 0;
    score = 0;
    timeLeft = 60;
    gameStarted = true;

    scoreDisplay.textContent = "Score: 0";
    timer.textContent = "Time: 60 seconds";
    feedback.textContent = "";

    startButton.hidden = true;
    restartButton.hidden = true;
    answerButton.hidden = false;
    nextButton.hidden = true;

    showQuestion();

    gameTimer = setInterval(function () {
        timeLeft--;

        timer.textContent = "Time: " + timeLeft + " seconds";

        if (timeLeft <= 0) {
            endGame("Time is up!");
        }
    }, 1000);
}

function showQuestion() {
    const currentQuestion = shuffledQuestions[questionNumber];

    const optionsHTML = currentQuestion.options.map(function (option) {
        return `
            <label>
                <input type="radio" name="answer" value="${option}">
                ${option}
            </label>
        `;
    }).join("");

    quiz.innerHTML = `
        <h2>Question ${questionNumber + 1} of ${shuffledQuestions.length}</h2>
        <p>${currentQuestion.question}</p>
        ${optionsHTML}
    `;

    feedback.textContent = "";
    answerButton.hidden = false;
    nextButton.hidden = true;
}

function checkAnswer() {
    if (!gameStarted) {
        return;
    }

    const selectedAnswer = document.querySelector(
        'input[name="answer"]:checked'
    );

    if (!selectedAnswer) {
        feedback.textContent = "Please choose an answer!";
        return;
    }

    if (
        selectedAnswer.value ===
        shuffledQuestions[questionNumber].answer
    ) {
        feedback.textContent = "Correct! Well done!";
        score++;
        scoreDisplay.textContent = "Score: " + score;
    } else {
        feedback.textContent =
            "Incorrect! The correct answer is " +
            shuffledQuestions[questionNumber].answer + ".";
    }

    answerButton.hidden = true;
    nextButton.hidden = false;

    const options = document.querySelectorAll(
        'input[name="answer"]'
    );

    options.forEach(function (option) {
        option.disabled = true;
    });
}

function nextQuestion() {
    if (!gameStarted) {
        return;
    }

    questionNumber++;

    if (questionNumber < shuffledQuestions.length) {
        showQuestion();
    } else {
        endGame("You answered all the questions!");
    }
}

function endGame(message) {
    if (!gameStarted) {
        return;
    }

    gameStarted = false;
    clearInterval(gameTimer);

    quiz.innerHTML = `
        <h2>Quiz Finished!</h2>
        <p>${message}</p>
        <p>Your final score is ${score} out of ${shuffledQuestions.length}.</p>
    `;

    feedback.textContent = "Thanks for playing!";

    answerButton.hidden = true;
    nextButton.hidden = true;
    restartButton.hidden = false;
}