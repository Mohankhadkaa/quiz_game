document.getElementById('start-quiz').addEventListener('click', startQuiz);

function startQuiz() {
    document.getElementById('initial-screen').classList.add('hidden');
    document.getElementById('quiz-container').classList.remove('hidden');
    startTimer();
    displayQuestion();
}

let score = 0;
let currentQuestionIndex = 0;
let timer;

const questions = [
    {
        question: "What does HTML stand for?",
        answers: ["Hyper Text Markup Language", "Hot Mail", "How to Make Lasagna", "Home Tool Markup Language"],
        correct: 0
    },
    {
        question: "What does CSS stand for?",
        answers: ["Creative Style Sheets", "Cascading Style Sheets", "Colorful Style Sheets", "Computer Style Sheets"],
        correct: 1
    },
    {
        question: "Who painted the famous artwork 'Starry Night'?",
        answers: ["Claude Monet", "Pablo Picasso", "Leonardo da Vinci", "Vincent van Gogh"],
        correct: 3
    },
    {
        question: "Who invented the telephone?",
        answers: ["Thomas Edison", "Alexander Graham Bell", "Nikola Tesla", "Isaac Newton"],
        correct: 1
    },
    {
        question: "What is the chemical symbol for gold?",
        answers: ["Ag", "Au", "Go", "Gd"],
        correct: 1
    },
    {
        question: "Who is the author of the famous novel 'To Kill a Mockingbird'?",
        answers: ["Ernest Hemingway", "J.K. Rowling", "Harper Lee", "Mark Twain"],
        correct: 2    },
    {
        question: "Who was the first President of the United States?",
        answers: ["Abraham Lincoln", "Thomas Jefferson", "George Washington", "John Adams"],
        correct: 2
    },
    {
        question: "What is the capital city of Australia?",
        answers: ["Canberra", "Sydney", "Melbourne", "Brisbane"],
        correct: 0
    },
    {
        question: "Which rapper won the Pulitzer Prize for Music in 2018?",
        answers: ["Kanye West", "Tupac", "Drake", "Kendrick Lamar"],
        correct: 3
    },
    {
        question: "Who won the FIFA World Cup in 2002?",
        answers: ["Italy", "Germany", "Brazil", "France"],
        correct: 2
    },
    {
        question: "Who is credited with inventing the World Wide Web (WWW)?",
        answers: ["Tim Berners-Lee", "Bill Gates", "Steve Jobs", "Mark Zuckerberg"],
        correct: 0
    },
    {
        question: "What is the largest sea in the world?",
        answers: ["Arabian Sea", "Caribbean Sea", "South China Sea", "Mediterranean Sea"],
        correct: 0
    }
];

function displayQuestion() {
    const questionElement = document.getElementById('question');
    const answerOptionsElement = document.getElementById('answer-options');

    questionElement.textContent = questions[currentQuestionIndex].question;
    answerOptionsElement.innerHTML = '';

    questions[currentQuestionIndex].answers.forEach((answer, index) => {
        const answerOption = document.createElement('div');
        answerOption.className = 'answer-option';
        answerOption.innerHTML = `
            <input type="radio" name="answer" id="answer${index}" value="${index}" style="display: none;">
            <label for="answer${index}">${answer}</label>
        `;
        answerOption.addEventListener('click', () => {
            document.querySelectorAll('.answer-option').forEach(option => {
                option.classList.remove('selected');
            });
            answerOption.classList.add('selected');
            document.getElementById(`answer${index}`).checked = true;
        });
        answerOptionsElement.appendChild(answerOption);
    });
}

document.getElementById('submit-answer').addEventListener('click', checkAnswer);

function checkAnswer() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');

    if (selectedAnswer) {
        const answerValue = parseInt(selectedAnswer.value);
        if (answerValue === questions[currentQuestionIndex].correct) {
            score++;
        }
        updateScore();
        nextQuestion();
    } else {
        alert('Please select an answer.');
    }
}

function updateScore() {
    document.getElementById('score-display').textContent = `Score: ${score}`;
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
        updateProgressBar();
    } else {
        endQuiz();
    }
}

function startTimer() {
    let timeLeft = 120;
    document.getElementById('timer').textContent = `Time left: ${timeLeft}`;
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = `Time left: ${timeLeft}`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            endQuiz();
        }
    }, 1000);
}

function endQuiz() {
    clearInterval(timer);
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = `
       <h2>Quiz Over!</h2>
        <p>Your final score is ${score} out of ${questions.length}.</p>
    `;
}

function updateProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

function checkAnswer() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');

    if (selectedAnswer) {
        const answerValue = parseInt(selectedAnswer.value);
        if (answerValue === questions[currentQuestionIndex].correct) {
            score++;
            showFeedback('Correct!');
        } else {
            showFeedback('Incorrect!');
        }
        updateScore();
        nextQuestion();
    } else {
        alert('Please select an answer.');
    }
}

function showFeedback(message) {
    const feedbackElement = document.createElement('p');
    feedbackElement.textContent = message;
    feedbackElement.classList.add('feedback');
    
    if (message === 'Incorrect!') {
        const correctAnswerIndex = questions[currentQuestionIndex].correct;
        const correctAnswer = questions[currentQuestionIndex].answers[correctAnswerIndex];
        feedbackElement.textContent += ` 
        
        The correct answer is: ${correctAnswer}`;
    }
    
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.appendChild(feedbackElement);
    
    setTimeout(() => {
        feedbackElement.remove();
    }, 1000); 
}

