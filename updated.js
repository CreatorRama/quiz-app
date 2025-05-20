document.addEventListener('DOMContentLoaded', () => {
    const welcomeScreen = document.getElementById('welcome-screen');
    const quizScreen = document.getElementById('quiz-screen');
    const startButton = document.getElementById('start-button');
    const optionsSection = document.querySelector('.options-section');
    const questionContainer = document.querySelector('.questions p');
    const nextButton = document.querySelector('.next');
    const prevButton = document.querySelector('.previous');
    const startQuizButton = document.querySelector('.start-btn');
    const stoppara = document.querySelector(".stop-watch p");
    const musicicon = document.querySelector(".music-icon");
    const body = document.querySelector("body");
    const count = document.querySelector(".questions-count p");
    const questioncontainer = document.querySelector(".questions-container");
    const quizcontainer = document.querySelector(".quiz-container");
    const resultcontainer = document.querySelector(".result-container");
    const retrybtn = document.querySelector(".retry");
    const score = document.querySelector(".score");
    const progress = document.querySelector(".progress");
    const rightarrow = document.querySelector(".right-arrow span");
    const leftarrow = document.querySelector(".left-arrow span");
    const highestscore = document.getElementById("highest-score");
    const highest = document.querySelector(".highest");
    const quote = document.querySelector(".para");

    let questionscount = 1;
    let resultcount = 0;

    const questions = [
        {
            question: "What is the capital of France?",
            options: ["Berlin", "Madrid", "Paris", "Rome"],
            correct: "Paris"
        },
        {
            question: "Who wrote 'To Kill a Mockingbird'?",
            options: ["Harper Lee", "Ernest Hemingway", "F. Scott Fitzgerald", "John Steinbeck"],
            correct: "Harper Lee"
        },
        {
            question: "What is the tallest mammal?",
            options: ["Giraffe", "Elephant", "Whale", "Polar bear"],
            correct: "Giraffe"
        },
        {
            question: "Which planet is known as the Red Planet?",
            options: ["Mars", "Venus", "Jupiter", "Saturn"],
            correct: "Mars"
        },
        {
            question: "Who painted the Mona Lisa?",
            options: ["Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh", "Michelangelo"],
            correct: "Leonardo da Vinci"
        }
    ];

    let currentQuestionIndex = 0;
    let timer = 0;
    let id;
    const audio = new Audio("o-kanha.mp3");
    let img = musicicon.querySelector('img');
    let correctcount = 1;
    let correct = 0;

    function handleOptionClick(optionDiv, option, questionObj) {
        return function() {
            const isCorrect = option === questionObj.correct;
            if (isCorrect) {
                resultcount++;
                correct = 1;
            } else {
                correct = 0;
            }
            
            if (correct && correctcount) {
                optionDiv.style.backgroundColor = "rgb(104, 70, 70)";
            } else if (!correct && correctcount) {
                optionDiv.style.backgroundColor = "rgb(104, 70, 70)";
            }
            
            const resultDiv = document.createElement('div');
            resultDiv.classList.add(isCorrect ? 'correct' : 'wrong');
            resultDiv.innerHTML = `<img src="${isCorrect ? 'correct.png' : 'wrong.png'}" alt="">`;
            
            if (correct && correctcount) {
                optionDiv.appendChild(resultDiv);
                optionDiv.classList.add(isCorrect ? 'border-class-green' : 'border-class-red');
                correctcount = 0;
            } else if (!correct && correctcount) {
                optionDiv.appendChild(resultDiv);
                optionDiv.classList.add(isCorrect ? 'border-class-green' : 'border-class-red');
            }
        };
    }

    function loadQuestion(index) {
        const questionObj = questions[index];
        questionContainer.innerText = questionObj.question;
        correctcount = 1;
        correct = 0;
        
        optionsSection.innerHTML = ''; // Clear existing options
        
        questionObj.options.forEach(option => {
            const optionDiv = document.createElement('div');
            optionDiv.classList.add('option');
            optionDiv.innerHTML = `<span>${option}</span>`;
            optionsSection.appendChild(optionDiv);
            
            const clickHandler = handleOptionClick(optionDiv, option, questionObj);
            optionDiv.addEventListener('click', clickHandler);
        });
    }

    startButton.addEventListener('click', () => {
        welcomeScreen.style.display = 'none';
        quizScreen.style.display = 'block';
        loadQuestion(currentQuestionIndex);
    });

    let ide = 0;
    startQuizButton.addEventListener('click', () => {
        clearInterval(ide);
        timer = 0;
        body.style.backgroundColor = "#CCE2C2";
        
        ide = setInterval(() => {
            if (timer === 15) {
                body.style.backgroundColor = "#D4D69F";
            }
            if (timer === 25) {
                body.style.backgroundColor = "#DBADAD";
            }
            if (timer <= 30) {
                stoppara.innerText = `${timer}:30`;
            } else {
                body.style.backgroundColor = "#CCE2C2";
                stoppara.innerText = `0:30`;
                clearInterval(ide);
            }
            timer++;
        }, 1000);
    });

    musicicon.addEventListener('click', () => {
        if (img.src.includes("volumeup.png")) {
            img.src = "mute.png";
            audio.play();
        } else {
            img.src = "volumeup.png";
            audio.pause();
        }
    });

    nextButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            loadQuestion(currentQuestionIndex);
        }
        
        if (questionscount == 4) {
            const resultbtn = document.createElement("div");
            const resultbtnpara = document.createElement("p");
            resultbtnpara.innerText = "SHOW RESULT";
            resultbtnpara.classList.add("parag");
            resultbtn.classList.add("show-result");
            resultbtn.appendChild(resultbtnpara);
            questioncontainer.appendChild(resultbtn);
            
            resultbtn.addEventListener("click", () => {
                if (timer > 0 && questionscount) {
                    clearInterval(ide);
                    timer = 0;
                    stoppara.innerText = `0:30`;
                    body.style.backgroundColor = "#CCE2C2";
                }
                quizcontainer.style.display = "none";
                resultcontainer.style.display = "block";
                score.innerText = `${resultcount}/5`;
                progress.style.width = `${resultcount / 5 * 100}%`;
                rightarrow.innerText = `${resultcount / 5 * 100}% right`;
                const result = `${resultcount / 5 * 100}`;
                leftarrow.innerText = `${100 - result}% wrong`;
                
                if (resultcount < 3) {
                    quote.innerText = "Very Poor, Try Again!";
                } else {
                    quote.innerText = "Keep learning, you have a good score!";
                }
            });
        }
        
        if (questionscount < 5) questionscount++;
        count.innerText = `${questionscount}/5`;
    });

    retrybtn.addEventListener("click", () => {
        currentQuestionIndex = 0;
        questionscount = 1;
        count.innerText = `${questionscount}/5`;
        loadQuestion(currentQuestionIndex);
        resultcontainer.style.display = "none";
        welcomeScreen.style.display = "block";
        highestscore.style.display = "block";
        highest.innerText = `HIGHEST SCORE: ${resultcount}/5`;
        resultcount = 0;
    });

    prevButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            loadQuestion(currentQuestionIndex);
        }
        if (questionscount > 1) questionscount--;
        count.innerText = `${questionscount}/5`;
    });

    // Load the first question initially
    loadQuestion(currentQuestionIndex);
});
