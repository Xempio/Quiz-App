function UI() {
    this.btn_start = document.querySelector(".btn-start"),
    this.next_btn = document.querySelector(".next-btn"),
    this.quiz_box = document.querySelector(".quiz-box"),
    this.accordion = document.querySelector(".accordion"),
    this.option_list = document.querySelector(".card .card-body .option-list"),
    this.correct_icon = `<div class="icon">
                            <i class="fas fa-check"></i>
                        </div>`;
    this.incorrect_icon = `<div class="icon">
                                 <i class="fas fa-times"></i>
                            </div>`;
    this.score_box = document.querySelector(".score-box"),
    this.btn_replay = document.querySelector(".btn-replay"),
    this.btn_quit = document.querySelector(".btn-quit"),
    this.time_text = document.querySelector(".time-text"),
    this.time_second = document.querySelector(".time-second")
}

UI.prototype.showQuestion = function (question, questionIdx) {
    let soru = 
    `
    <h4>Question ${questionIdx+1}</h4>
        <span>${question.title}</span>
    `
    const bodyLines = question.body.split('\n');
    let bodyHtml = '';
    let options = ['A','B','C','D'];
    for (let index = 0; index < bodyLines.length; index++) {
        bodyHtml += 
            `
                <div class="option">
                    <span><b>${options[index]}-)</b> ${bodyLines[index]}</span>
                </div>
            `;
    }
    let body = 
    `   
        ${bodyHtml}
    `;
    
    document.querySelector(".card .card-body .question-text").innerHTML = "";
    document.querySelector(".card .card-body .option-list").innerHTML = "";
    document.querySelector(".card .card-body .question-text").insertAdjacentHTML("beforeend",soru);
    this.option_list.insertAdjacentHTML("beforeend", body)

    const choice = this.option_list.querySelectorAll(".option");
    // console.log(choice);
    for (let opt of choice) {
        // console.log(opt);
        opt.setAttribute("onclick", "optionSelected(this)")
    }
}

UI.prototype.showQuestionNumber = function (questionOrder, totalQuestion) {
    let tag = 
    `   
        <span class="badge bg-warning">${questionOrder} / ${totalQuestion}</span>
    `;
    document.querySelector(".quiz-box .question-index").innerHTML = tag;
}

UI.prototype.showScore = function(totalQuestion, correctAnswers) {
    let tag = 
        `
            Toplam ${totalQuestion} sorudan ${correctAnswers} doğru cevap verdiniz.
        `;
    document.querySelector(".score-box .row .score-text").innerHTML = tag;
}

UI.prototype.showUserAnswers = function(userResponses) {
    let tableHtml = `
        <div class="table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Numbers</th>
                        <th scope="col">Questions</th>
                        <th scope="col">Your Answers</th>
                        <th scope="col">Correct Answers</th>
                    </tr>
                </thead>
            
    `;

    for (let index = 0; index < userResponses.length; index++) {
        let questionIndex = index + 1;
        let userAnswer = userResponses[index];
        let correctAnswer = correctAnswers[index];
        let isCorrect = userAnswer == correctAnswer;
        let rowIsCorrect = isCorrect ? 'table-success' : 'table-danger';
        let userAnswerText = userAnswer === null ? "Not Answered" : userAnswer;

        tableHtml += `
            <tbody>
            <tr class="${userAnswer === null ? 'table-warning' : rowIsCorrect}">
                <th scope="row">${questionIndex}</th>
                <td>${data[index].title}</td>
                <td>${userAnswerText}</td>
                <td>${correctAnswer}</td>
            </tr>
        `;
    }

    tableHtml += 
    `
                </tbody>
            </table>
        </div>
    `;

    document.querySelector(".show-user-answers").innerHTML = tableHtml;
}
