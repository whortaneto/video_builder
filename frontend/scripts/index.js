function IndexPage() {

  window.onload = () => {
    loadLessons();
  }

  let loadLessons = () => {
    lessonService.getAll()
        .then(function(result) {
          fillDataTable(
            document.querySelector('tbody'),
            result
          );
        });
  }

  let fillDataTable = (domTbleBody, data) => {
    data.forEach(item => {
      let tr = domTbleBody.insertRow();
      tr.align = 'center';

      let edit = () => document.location.href = 'edit.html?lesson=' + item._id;

      let remove = () => lessonService.delete(item._id).then(()=>tr.remove());

      let viewAnswers = () => document.location.href = 'answers.html?lesson=' + item._id;

      let actions = document.createElement('div');
      actions.style = 'padding: 4px;';

      let editButton = primaryButton(edit, 'Edit');
      editButton.style = 'margin: 0 4px 0 0';
      actions.appendChild(editButton);

      let answersButton = primaryButton(viewAnswers, 'Answers');
      answersButton.style = 'margin: 0 4px 0 0';
      actions.appendChild(answersButton);

      let removeButton = dangerButton(remove, 'Remove');
      removeButton.style = 'margin: 0 4px 0 0';
      actions.appendChild(removeButton);

      let i =0;
      tr.insertCell(i++).innerText = item._id;
      tr.insertCell(i++).innerText = item.urlVideo;
      tr.insertCell(i++).appendChild(actions);
    });
  }

  this.add = () => {
    document.location.href = 'edit.html';
  }

}

const indexPage = new IndexPage();