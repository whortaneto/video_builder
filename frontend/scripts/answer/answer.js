function AnswerPage() {

  window.onload = () => {
    let lessonId = getURLParameter('lesson');
    if(lessonId!=undefined) {
      loadAwnsers(lessonId)
    }
  }

  const loadAwnsers = (id) => {
    answerService.getByLesson(id)
      .then(function(result) {
        fillDataTable(
          document.querySelector('tbody'),
          result);
      });
  }

  this.back = () => document.location.href = 'index.html';

  let fillDataTable = (domTbleBody, data) => {
    data.forEach(item => {

      let tr = domTbleBody.insertRow();
      tr.align = 'center';

      let i =0;
      tr.insertCell(i++).innerText = item.user;
      tr.insertCell(i++).innerText = item.lesson;
      tr.insertCell(i++).innerText = item.question;

      insertAttempsTable(tr, item.attempts);
    });
  }

  const insertAttempsTable = (container, attempts) => {
    const domTble = document.createElement('table'),
      domTbleBody = document.createElement('tbody'),
      domTbleHead = document.createElement('thead');

    insertAttempsHeader(domTbleHead);

    attempts.forEach(attempt => {
      let tr = domTbleBody.insertRow();
      tr.align = 'center';

      let i =0;
      tr.insertCell(i++).innerText = attempt.attempt;
      tr.insertCell(i++).innerText = attempt.text;
      tr.insertCell(i++).innerText = attempt.isCorrect;
    });

    domTble.appendChild(domTbleHead);
    domTble.appendChild(domTbleBody);
    container.appendChild(domTble);
  }

  const insertAttempsHeader = (domTbleHead) => {
    let tr = domTbleHead.insertRow(0);
    tr.align = 'center';

    let th = document.createElement('th');
    tr.appendChild(th);
    th.appendChild(document.createTextNode('Attempt'));

    th = document.createElement('th');
    tr.appendChild(th);
    th.appendChild(document.createTextNode('Text'));

    th = document.createElement('th');
    tr.appendChild(th);
    th.appendChild(document.createTextNode('Is Correct'));
  }

  const getURLParameter = (name) => {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
  }
}

const answerPage = new AnswerPage();