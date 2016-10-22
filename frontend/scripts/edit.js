
let answer = {
  "text": "XXX",
  "isCorrect": true
}

let question = {
  "time": 0,
  "question": "XXXXXXXXXXXX",
  "choices": []
}

let lesson = {
  "urlVideo": "XXXXXXXXXXXXXXX",
  "questions": []
};

window.onload = () => {
  let lessonId = getURLParameter('lesson');
  if(lessonId!=undefined) {
    loadLesson(lessonId)
  }
}

let loadLesson = (id) => {
  lessonService.get(id)
    .then(function(result) {
      fillInputs(result);
    });
}

let fillInputs = (data) => {
  lesson = data;
  document.querySelector('#_id').value = lesson._id;
  document.querySelector('#urlVideo').value = lesson.urlVideo;

  fillQuestionDataTable(document.querySelector('#questionsTable'), lesson.questions);
}

let addQuestion = () => {
  question.time = document.querySelector('#time').value;
  question.question = document.querySelector('#question').value;

  if (question.time == '' || question.question == '' || question.choices.length == 0) {
    alert('Question is required. Cade o Carlos?');
    return;
  }

  lesson.questions.push(question);

  addQuestionRow(question, document.querySelector('#questionsTable > tbody'));

  document.querySelector('#time').value = ''
  document.querySelector('#question').value = '';

  clearTable(document.querySelector('#answersTable > tbody'));
}

let addAnswer = () => {
  answer.text = document.querySelector('#answer').value;
  answer.isCorrect = document.querySelector('#isCorrect').value;

  if (answer.text == '' || answer.isCorrect == '') {
    alert('Answer is required. Cade o Carlos?');
    return;
  }

  question.choices.push(answer);

  addAnswerRow(answer, document.querySelector('#answersTable > tbody'));

  document.querySelector('#answer').value = ''
  document.querySelector('#isCorrect').value = false;
}

let fillQuestionDataTable = (domTbleBody, data) => {
  data.forEach(item => {
    addQuestionRow(item, domTbleBody);
  });
}

let addQuestionRow = (question, domTbleBody) => {
  let tr = domTbleBody.insertRow();
  tr.align = 'center';

  let i =0;
  tr.insertCell(i++).innerText = question.time;
  tr.insertCell(i++).innerText = question.question;
}


let clearTable = (myNode) => {
  while (myNode.firstChild) { 
    myNode.firstChild.remove();
  }
}


let fillAnswerDataTable = (domTbleBody, data) => {
  data.forEach(item => {
    addAnswerRow(item, domTbleBody);
  });
}

let addAnswerRow = (answer, domTbleBody) => {
    let tr = domTbleBody.insertRow();
    tr.align = 'center';

    let i =0;
    tr.insertCell(i++).innerText = answer.text;
    tr.insertCell(i++).innerText = answer.isCorrect;
}

let back = () => {
  document.location.href = 'index.html';
}

let save = () => {
  lesson.urlVideo = document.querySelector('#urlVideo').value;
  lessonService.save(lesson).then(back());
}

let getURLParameter = (name) => {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}