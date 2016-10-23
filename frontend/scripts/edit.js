function EditService() {

  let answer = {
    "text": "XXX",
    "isCorrect": true
  }

  let question = {
    "index": 1, 
    "time": 0,
    "question": "XXXXXXXXXXXX",
    "choices": []
  }

  let lesson = {
    "urlVideo": "XXXXXXXXXXXXXXX",
    "questions": []
  };

  this.back = () => {
    document.location.href = 'index.html';
  }

  this.save = () => {    
    lesson.urlVideo = document.querySelector('#urlVideo').value;
    lessonService.save(lesson).then(()=>this.back());
  }  

  this.addQuestion = () => {

    let _id = document.querySelector('#_idQuestion').value === '' ? undefined : document.querySelector('#_idQuestion').value;

    let questionParam = {
      _id: _id,
      index: document.querySelector('#index').value,
      time: document.querySelector('#time').value,
      question: document.querySelector('#question').value,
      choices: question.choices 
    }

    if (questionParam.time == '' || questionParam.question == '' || questionParam.choices.length == 0 || questionParam.index < 1) {
      alert('Question is required. Cade o Carlos?');
      return;
    }

    if (questionParam._id == undefined || questionParam._id == '') {
      lesson.questions.push(questionParam);
      addQuestionRow(questionParam, document.querySelector('#questionsTable > tbody'));
    } else {
      let index;
      lesson.questions.forEach(item => {
        if (item._id === questionParam._id) {
          index = lesson.questions.indexOf(item);
        }
      });

      lesson.questions.splice(index, 1);
      lesson.questions.push(questionParam);
    }

    document.querySelector('#time').value = ''
    document.querySelector('#question').value = '';

    clearTable(document.querySelector('#answersTable > tbody'));
  }

  this.addAnswer = () => {
    let answer = {
      text: document.querySelector('#answer').value,
      isCorrect: document.querySelector('#isCorrect').value
    }

    if (answer.text == '' || answer.isCorrect == '') {
      alert('Answer is required. Cade o Carlos?');
      return;
    }

    question.choices.push(answer);

    addAnswerRow(answer, document.querySelector('#answersTable > tbody'));

    document.querySelector('#answer').value = ''
    document.querySelector('#isCorrect').value = false;
  }

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

  let fillQuestionDataTable = (domTbleBody, data) => {
    data.forEach(item => {
      addQuestionRow(item, domTbleBody);
    });
  }

  let addQuestionRow = (questionParam, domTbleBody) => {
    let tr = domTbleBody.insertRow();
    tr.align = 'center';

    let remove = () => {
      let index = lesson.questions.indexOf(questionParam);
      lesson.questions.splice(index, 1);
      tr.remove();
    };

    let edit = () => {
      document.querySelector('#_idQuestion').value = questionParam._id;
      document.querySelector('#index').value = questionParam.index;
      document.querySelector('#time').value = questionParam.time;
      document.querySelector('#question').value = questionParam.question;   

      question = questionParam;

      clearTable(document.querySelector('#answersTable > tbody'));
      fillAnswerDataTable(document.querySelector('#answersTable > tbody'), questionParam.choices);
    }

    let actions = document.createElement('div');
    actions.appendChild(createButton(edit, 'Edit', 'glyphicon glyphicon-pencil'));
    actions.appendChild(createButton(remove, 'Remove', 'glyphicon glyphicon-trash'));

    let i =0;
    tr.insertCell(i++).innerText = questionParam.index;    
    tr.insertCell(i++).innerText = questionParam.time;
    tr.insertCell(i++).innerText = questionParam.question;
    tr.insertCell(i++).appendChild(actions);
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

  let getURLParameter = (name) => {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
  }
}

const editService = new EditService();