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
    lessonService.save(lesson).then(this.back());
  }  

  this.addQuestion = () => {

    let _id = document.querySelector('#_idQuestion').value === '' ? undefined : document.querySelector('#_idQuestion').value;

    let questionParam = {
      _id: _id,
      index: document.querySelector('#index').value,
      time: document.querySelector('#time').value,
      question: document.querySelector('#question').value,
      choices: question.choices.filter(() => true)
    }

    if (questionParam.time == '' || questionParam.question == '' || questionParam.choices.length == 0 || questionParam.index < 1) {
      alert('Question is required. Cade o Carlos?');
      return;
    }

    if (questionParam.choices.length < 2 || questionParam.choices.length > 6) {
      alert('It\'s necessary have between 2 and 6 answers.');
      return; 
    }

    let correctAnswer = false;
    for (item in questionParam.choices) {
      if (questionParam.choices[item].isCorrect) {
        correctAnswer = true;
        break;
      }
    }
    if (!correctAnswer) {
      alert('It`s necessary some one correct answer. Cade o Carlos?');
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
    question.choices = [];

    clearTable(document.querySelector('#answersTable > tbody'));
  }

  this.addAnswer = () => {
    let answer = {
      text: document.querySelector('#answer').value,
      isCorrect: document.querySelector('#isCorrect').checked
    }

    if (answer.text == '') {
      alert('Answer is required. Cade o Carlos?');
      return;
    }

    if (answer.isCorrect) {
      for (item in question.choices) {
        if (question.choices[item].isCorrect) {
           alert('It`s possible only one answer correct. Cade o Carlos?');
           return;     
        }
      }
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

  const loadLesson = (id) => {
    lessonService.get(id)
      .then(function(result) {
        fillInputs(result);
      });
  }

  const fillInputs = (data) => {
    lesson = data;
    document.querySelector('#_id').value = lesson._id;
    document.querySelector('#urlVideo').value = lesson.urlVideo;

    fillQuestionDataTable(document.querySelector('#questionsTable'), lesson.questions);
  }

  const fillQuestionDataTable = (domTbleBody, data) => {
    data.forEach(item => {
      addQuestionRow(item, domTbleBody);
    });
  }

  const addQuestionRow = (questionParam, domTbleBody) => {
    let tr = domTbleBody.insertRow();
    tr.align = 'center';

    const remove = () => {
      let index = lesson.questions.indexOf(questionParam);
      lesson.questions.splice(index, 1);
      tr.remove();
    };

    const edit = () => {
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

  const clearTable = (myNode) => {
    while (myNode.firstChild) { 
      myNode.firstChild.remove();
    }
  }

  const fillAnswerDataTable = (domTbleBody, data) => {
    data.forEach(item => {
      addAnswerRow(item, domTbleBody);
    });
  }

  const addAnswerRow = (answerParam, domTbleBody) => {
      let tr = domTbleBody.insertRow();
      tr.align = 'center';

      const remove = () => {
        let index = question.choices.indexOf(answerParam);
        question.choices.splice(index, 1);
        tr.remove();
      };

      let actions = document.createElement('div');
      actions.appendChild(createButton(remove, 'Remove', 'glyphicon glyphicon-trash'));

      let i =0;
      tr.insertCell(i++).innerText = answerParam.text;
      tr.insertCell(i++).innerText = answerParam.isCorrect;
      tr.insertCell(i++).appendChild(actions);
  }

  const getURLParameter = (name) => {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
  }
}

const editService = new EditService();