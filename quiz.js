let currentPageIndex = 0;
let userScore = 0;
let userAnswers = [];
let selectedTopics = [];
let currentQuestionIndex = 0;

const quizData = [
    {
        "category": "General Knowledge",
        "questions": [
            {
                "question": "Who wrote 'To Kill a Mockingbird'?",
                "options": ["Harper Lee", "George Orwell", "Jane Austen", "F. Scott Fitzgerald"],
                "answer": "Harper Lee"
            },
            {
                "question": "What is the capital of France?",
                "options": ["Berlin", "Paris", "London", "Madrid"],
                "answer": "Paris"
            },
            {
                "question": "In which year did World War II end?",
                "options": ["1943", "1945", "1950", "1939"],
                "answer": "1945"
            },
            {
                "question": "Who painted the Mona Lisa?",
                "options": ["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso", "Claude Monet"],
                "answer": "Leonardo da Vinci"
            }
            // Add more questions...
        ]
    },
    {
        "category": "Science",
        "questions": [
            {
                "question": "What is the largest planet in our solar system?",
                "options": ["Earth", "Jupiter", "Mars", "Saturn"],
                "answer": "Jupiter"
            },
            {
                "question": "What is the powerhouse of the cell?",
                "options": ["Nucleus", "Mitochondria", "Endoplasmic Reticulum", "Golgi Apparatus"],
                "answer": "Mitochondria"
            },
            {
                "question": "Which gas do plants absorb during photosynthesis?",
                "options": ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
                "answer": "Carbon Dioxide"
            },
            {
                "question": "What is the chemical symbol for water?",
                "options": ["H2O", "CO2", "O2", "N2"],
                "answer": "H2O"
            }
            // Add more questions...
        ]
    },
    {
        "category": "Mathematics",
        "questions": [
            {
                "question": "What is the square of 9?",
                "options": ["72", "81", "64", "100"],
                "answer": "81"
            },
            {
                "question": "Solve for x: 2x + 5 = 15",
                "options": ["5", "7", "10", "15"],
                "answer": "5"
            },
            {
                "question": "What is the perimeter of a rectangle with length 8 and width 5?",
                "options": ["13", "26", "40", "48"],
                "answer": "26"
            },
            {
                "question": "What is the value of sin(90 degrees)?",
                "options": ["0", "1", "-1", "Undefined"],
                "answer": "1"
            }
            // Add more questions...
        ]
    },
    // Add more categories as needed...
];


function startSolving() {
    showPage(1);
    loadTopics();
}

function loadTopics() {
    const topicList = document.getElementById('topicList');
    quizData.forEach(category => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = category.category;
        checkbox.value = category.category;
        checkbox.addEventListener('change', () => toggleTopicSelection(category.category));

        const label = document.createElement('label');
        label.htmlFor = category.category;
        label.textContent = category.category;

        topicList.appendChild(checkbox);
        topicList.appendChild(label);
    });
}


function toggleTopicSelection(topic) {
    const index = selectedTopics.indexOf(topic);
    if (index === -1) {
        selectedTopics.push(topic);
    } else {
        selectedTopics.splice(index, 1);
    }
}

function startQuiz() {
    showPage(2);
    loadQuizQuestions();
}

function loadQuizQuestions() {
    const questionContainer = document.getElementById('questionContainer');
    questionContainer.innerHTML = '';

    displayQuestion(currentQuestionIndex);
}

function displayQuestion(index) {
    const question = quizData[index % quizData.length].questions[index % quizData.length];
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = `
        <p>${question.question}</p>
        <div class="options">
            ${question.options.map((option, optionIndex) => `
                <input type="radio" name="q${index}" value="${option}" id="q${index}-${optionIndex}">
                <label for="q${index}-${optionIndex}">${option}</label>
            `).join('')}
        </div>
        <button onclick="prevQuestion()">Previous</button>
        <button onclick="nextQuestion()">Next</button>
    `;
    document.getElementById('questionContainer').innerHTML = '';
    document.getElementById('questionContainer').appendChild(questionElement);
}
function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion(currentQuestionIndex);
    }
}

function nextQuestion() {
    if (currentQuestionIndex < quizData.length * quizData[0].questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion(currentQuestionIndex);
    } else {
        // If it's the last question, move to the startQuiz() function
        startQuiz();
    }
}

function submitQuiz() {
    const selectedOptions = document.querySelectorAll('input:checked');
    
    if (selectedOptions.length === 0) {
        alert('Please select at least one option before submitting the quiz.');
        return;
    }

    selectedOptions.forEach(option => {
        userAnswers.push(option.value);
    });

    calculateScore();
}

function calculateScore() {
    userAnswers.forEach((userAnswer, index) => {
        const correctAnswer = quizData[index % quizData.length].questions[index % quizData.length].answer;
        if (userAnswer === correctAnswer) {
            userScore++;
        }
    });

    showResultsPage();
}

function showResultsPage() {
    showPage(3);
    const finalScoreElement = document.getElementById('finalScore');
    finalScoreElement.textContent = userScore;
}

function showPage(index) {
    const pages = document.querySelectorAll('.page');

    if (index >= 0 && index < pages.length) {
        pages.forEach(page => page.style.display = 'none');
        pages[index].style.display = 'block';
    } else {
        console.error("Invalid page index");
    }
}

document.addEventListener('DOMContentLoaded', function () { 
    startSolving();  
});
