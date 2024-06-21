const DATA = [{
    question: 'Какой цвет у солнца',
    answers: [{
            id: '1',
            value: 'Зеленый',
            correct: false,
        },
        {
            id: '2',
            value: 'Желтый',
            correct: true,
        },
        {
            id: '3',
            value: 'Красный',
            correct: false,
        },
    ]
},
{
    question: 'Какой звук издает собака',
    answers: [{
            id: '4',
            value: 'Мяу',
            correct: false,
        },
        {
            id: '5',
            value: 'Гав',
            correct: true,
        },
        {
            id: '6',
            value: 'Муу',
            correct: false,
        },
    ]
},
{
    question: 'Какой сезон идет после зимы',
    answers: [{
            id: '7',
            value: 'Весна',
            correct: true,
        },
        {
            id: '8',
            value: 'Лето',
            correct: false,
        },
        {
            id: '9',
            value: 'Осень',
            correct: false,
        },
    ]
}
]


let localResults = {};

const quiz = document.getElementById('quiz');
const questions = document.getElementById('questions');
const indicator = document.getElementById('indicator');
const results = document.getElementById('results');
const btnNext = document.getElementById('btn-next');
const btnRestart = document.getElementById('btn-restart');



const renderQuestions = (index) => {
renderIndicator(index + 1);

questions.dataset.currentStep = index;

const renderAnswers = () => DATA[index].answers
    .map((answer) => `
        <li>
            <div>
                <label class="answer-item">
                    <input class="answer-input" type="radio" name=${index} value=${answer.id}>
                    <span class="answer-text">${answer. value}</span>
                </label>
            </div>
        </li>
    `)
    .join('');

questions.innerHTML = `
        <div class="quiz-questions-item"> 
            <div class="quiz-questions-item_question">${DATA[index].question}</div> 
            <ul class="quiz-questlons-item_answers">${renderAnswers()}</ul> 
        </div>
    `;
};


const renderResults = () => {
let content = '';

const getClassname = (answer, questionIndex) => {
    let classname = '';

    if (!answer.correct && answer.id === localResults[questionIndex]) {
        classname = 'answer--invalid';
    } else if (answer.correct) {
        classname = 'answer--valid';
    }

    return classname;
};

const getAnswers = (questionIndex) => DATA[questionIndex].answers
    .map((answer) => `<li class="${getClassname(answer, questionIndex)}">${answer.value}</li>`)
    .join('');

DATA.forEach((question, index) => {
    content += `
                
                <div class="quiz-results-item">
                    <div class="quiz-results-item_question">${question.question}</div>
                    <ul class="quiz-results-item_answers">${getAnswers(index)}</ul>
                </div>
            `;
});

results.innerHTML = content;

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
 }

// Переход на страницу
if (checkAnswers()) {
    // Создаем новую кнопку
    const btnGoToIndex = document.createElement('button');
    btnGoToIndex.innerHTML = 'Перейти на следующий уровень';
    btnGoToIndex.className = 'results-next'; // добавляем класс 'title'
    btnGoToIndex.onclick = () => window.location.href = '../index.html';
    results.appendChild(btnGoToIndex);

    // Создаем новый элемент для текста "ответы верны" и добавляем ему класс 'title'
    const correctAnswersText = document.createElement('p');
    correctAnswersText.innerHTML = 'Молодец ты ответил правильно';
    correctAnswersText.className = 'results-title'; // добавляем класс 'title'
    results.appendChild(correctAnswersText);

    // Устанавливаем куки
    setCookie('levelPassedTree', 'true', 1); 
} else {
    // Создаем новый элемент для текста "ответы верны"
    const correctAnswersText = document.createElement('p');
    correctAnswersText.innerHTML = 'Попробуй еще раз';
    results.appendChild(correctAnswersText);
}
};

// После функции renderResults добавьте функцию checkAnswers
const checkAnswers = () => {
let isAllCorrect = true;
for (let key in localResults) {
    const correctAnswer = DATA[key].answers.find(answer => answer.correct);
    if (correctAnswer.id !== localResults[key]) {
        isAllCorrect = false;
        break;
    }
}
return isAllCorrect;
};



// 
const renderIndicator = (currentStep) => {
indicator.innerHTML = `${currentStep}/${DATA.length}`;
};
// 
quiz.addEventListener('change', (event) => {
if (event.target.classList.contains('answer-input')) {
    localResults[event.target.name] = event.target.value;
    btnNext.disabled = false;
}
});






quiz.addEventListener('click', (event) => {
if (event.target.classList.contains('btn-next')) {
    const nextQuestionIndex = Number(questions.dataset.currentStep) + 1;

    if (DATA.length === nextQuestionIndex) {
        questions.classList.add('questions--hidden');
        indicator.classList.add('indicator--hidden');
        results.classList.add('indicator--visible');
        btnNext.classList.add('btn-next--hidden');
        btnRestart.classList.add('btn-restart--visible');

        renderResults();
    } else {
        renderQuestions(nextQuestionIndex);
    }

    btnNext.disabled = true;

}

if (event.target.classList.contains('btn-restart')) {
    results.innerHTML = '';

    questions.classList.remove('questions--hidden');
    indicator.classList.remove('indicator--hidden');
    results.classList.remove('indicator--visible');
    btnNext.classList.remove('btn-next--hidden');
    btnRestart.classList.remove('btn-restart--visible');

    renderQuestions(0);

}

});


renderQuestions(0);