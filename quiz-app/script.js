let quiz;
let correctAnswers = ["A", "B", "C", "D", "A", "B", "C", "D", "A", "B"];
const ui = new UI();

ui.btn_start.addEventListener('click', () => {
    if (!quiz) {
        quiz = new Quiz(data);
        quiz.userResponses = Array(quiz.totalQuestions).fill(null);
    }
    ui.quiz_box.classList.add("active");
    startTimer(30);
    ui.accordion.style.display = "none";
    let question = quiz.getQuestion();
    ui.showQuestion(question, quiz.questionIdx);
    ui.next_btn.classList.remove("show");
    ui.showQuestionNumber(quiz.questionIdx + 1, quiz.totalQuestions);
})

ui.next_btn.addEventListener("click", () => {
    if (quiz.questionIdx < quiz.questions.length - 1) {
        quiz.questionIdx++;
        clearInterval(counter);
        startTimer(30);
        let question = quiz.getQuestion();
        ui.showQuestion(question, quiz.questionIdx);
        ui.showQuestionNumber(quiz.questionIdx + 1, quiz.totalQuestions);
        for (let i = 0; i < ui.option_list.children.length; i++) {
            ui.option_list.children[i].classList.remove("disabled");
        }
        ui.next_btn.classList.remove("show");
        optionClicked = false;
    } else {
        alert("Quiz Bitti");
        clearInterval(counter);
        ui.quiz_box.classList.remove("active");
        ui.score_box.classList.add("active");
        ui.showScore(quiz.totalQuestions, quiz.numberOfCorrects);
        ui.showUserAnswers(quiz.userResponses);
    }
});

ui.btn_quit.addEventListener("click", () => {
    window.location.reload();
})

ui.btn_replay.addEventListener("click", () => {
    quiz.questionIdx = 0;
    quiz.numberOfCorrects = 0;
    ui.btn_start.click();
    ui.score_box.classList.remove("active");
})

let optionClicked = false;

function optionSelected(option) {
    let response = option.querySelector("span b").textContent.split("-")[0].trim();
    let question_index = quiz.questionIdx;
    let correctAnswer = correctAnswers[question_index];
    if (response == correctAnswer) {
        quiz.numberOfCorrects++;
        option.classList.add("correct");
        option.insertAdjacentHTML("beforeend", ui.correct_icon);
    } else {
        option.classList.add("incorrect");
        option.insertAdjacentHTML("beforeend", ui.incorrect_icon);
    }

    for (let i = 0; i < ui.option_list.children.length; i++) {
        ui.option_list.children[i].classList.add("disabled");
    }

    ui.next_btn.classList.add("show");
    quiz.userResponses[question_index] = response;

    optionClicked = true;
}
let counter;
function startTimer(time) {
    counter = setInterval(timer, 1000); 

    function timer() {
        ui.time_second.textContent = time;
        time--;
        
        if (time >= 20) {
            for (let i = 0; i < ui.option_list.children.length; i++) {
                ui.option_list.children[i].classList.add("disabled");
            }
        } else {
            if (optionClicked && time < 20) {
                for (let i = 0; i < ui.option_list.children.length; i++) {
                    ui.option_list.children[i].classList.add("disabled");
                }
            } else {
                for (let i = 0; i < ui.option_list.children.length; i++) {
                    ui.option_list.children[i].classList.remove("disabled");
                }
            }
        }

        if (time < 0) {
            clearInterval(counter);
            ui.time_text.textContent = "Süreniz Bitti";

            let correctAnswer = correctAnswers[quiz.questionIdx];

            for(let opt of ui.option_list.children) {
                if(opt.querySelector("span b").textContent.split("-")[0].trim() == correctAnswer) {
                    opt.classList.add('correct');
                    opt.insertAdjacentHTML("beforeend", ui.correct_icon);
                }
                opt.classList.add("disabled");
            }
            ui.next_btn.classList.add("show");
            setTimeout(() => {
                ui.next_btn.click();
            }, 2000);
        }
    }
}
