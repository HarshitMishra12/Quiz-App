const questions = [
    {
      question: "Which IPL team has Virat Kohli played for since the beginning of the tournament?",
      answers: [
        { text: "Sunrisers Hyderabad", correct: false },
        { text: "Royal Challengers Bangalore", correct: true },
        { text: "Kolkata Knight Riders", correct: false },
        { text: " Delhi Capitals", correct: false },
      ]
    },
    {
      question: "What is Virat Kohli's jersey number when playing for India?",
      answers: [
        { text: "10", correct: false },
        { text: "7", correct: false },
        { text: "18", correct: true },
        { text: "33", correct: false },
      ]
    },
    {
      question: "Which basketball player is known as “King James?",
      answers: [
        { text: "Kobe Bryant", correct: false },
        { text: "Stephen Curry", correct: false },
        { text: "LeBron James", correct: true },
        { text: "Kevin Durant", correct: false },
      ]
    },
    {
      question: "How many players are on the court from one team in a standard basketball game?",
      answers: [
        { text: "6", correct: false },
        { text: "5", correct: true },
        { text: "7", correct: false },
        { text: "4", correct: false },
      ]
    },
    {
      question: "Which keyword is used to declare a constant variable in JavaScript?",
      answers: [
        { text: "var", correct: false },
        { text: "let", correct: false },
        { text: "const", correct: true },
        { text: "define", correct: false },
      ]
    }
  ];
  
  const questionContainer = document.getElementById("question-container");
  const questionEl = document.getElementById("question");
  const answerButtons = document.getElementById("answer-buttons");
  const nextButton = document.getElementById("next-btn");
  const scoreContainer = document.getElementById("score-container");
  const scoreText = document.getElementById("score");
  const progressBar = document.getElementById("progress-bar");
  const timerEl = document.getElementById("timer");
  
  let currentQuestionIndex = 0;
  let score = 0;
  let timer;
  let timeLeft = 15;
  
  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreContainer.classList.add("hide");
    nextButton.innerText = "Next";
    questionContainer.classList.remove("hide");
    showQuestion();
  }
  
  function startTimer() {
    timeLeft = 15;
    timerEl.innerText = `${timeLeft}s`;
    clearInterval(timer);
    timer = setInterval(() => {
      timeLeft--;
      timerEl.innerText = `${timeLeft}s`;
      if (timeLeft <= 0) {
        clearInterval(timer);
        handleTimeOut();
      }
    }, 1000);
  }
  
  function handleTimeOut() {
    const allButtons = answerButtons.children;
    for (let btn of allButtons) {
      btn.disabled = true;
      if (btn.innerText === questions[currentQuestionIndex].answers.find(a => a.correct).text) {
        btn.classList.add("correct");
      }
    }
    nextButton.style.display = "inline-block";
  }
  
  function showQuestion() {
    resetState();
    startTimer();
  
    let currentQuestion = questions[currentQuestionIndex];
    questionEl.innerText = currentQuestion.question;
  
    currentQuestion.answers.forEach(answer => {
      const button = document.createElement("button");
      button.innerText = answer.text;
      button.classList.add("btn");
      button.addEventListener("click", () => selectAnswer(button, answer.correct));
      answerButtons.appendChild(button);
    });
  
    let progressPercent = (currentQuestionIndex / questions.length) * 100;
    progressBar.style.width = `${progressPercent}%`;
  }
  
  function resetState() {
    nextButton.style.display = "none";
    answerButtons.innerHTML = "";
  }
  
  function selectAnswer(button, correct) {
    clearInterval(timer);
    const allButtons = answerButtons.children;
    for (let btn of allButtons) {
      btn.disabled = true;
      if (btn.innerText === questions[currentQuestionIndex].answers.find(a => a.correct).text) {
        btn.classList.add("correct");
      }
    }
  
    if (correct) {
      button.classList.add("correct");
      score++;
    } else {
      button.classList.add("wrong");
    }
  
    nextButton.style.display = "inline-block";
  }
  
  nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showScore();
    }
  });
  
  function showScore() {
    clearInterval(timer);
    questionContainer.classList.add("hide");
    nextButton.style.display = "none";
    scoreContainer.classList.remove("hide");
    scoreText.innerText = `${score} / ${questions.length}`;
    progressBar.style.width = "100%";
    timerEl.style.display = "none";
  
    // 🎉 Confetti celebration
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 }
    });
  }
  
  startQuiz();
  