const request = new XMLHttpRequest();

request.open('GET', 'https://jsonplaceholder.typicode.com/posts');
request.send();

let data = [];
request.addEventListener('load', resp);

function Quiz(questions) {
    this.questions = questions;
    this.questionIdx = 0;
    this.totalQuestions = questions.length;
    this.numberOfCorrects = 0;
    this.userResponses = [];
}

function resp() {
    data = JSON.parse(this.responseText).slice(0, 10);
}

Quiz.prototype.getQuestion = function() {
    return this.questions[this.questionIdx];
}