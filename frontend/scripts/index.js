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

    let actions = document.createElement('div')
    actions.style = 'padding: 4px;'; 
    let button = primaryButton(edit, 'Edit')
    button.style = 'margin: 0 4px 0 0';
    actions.appendChild(button)
    button = dangerButton(remove, 'Remove')
    actions.appendChild(button)
    
    let i =0;
    tr.insertCell(i++).innerText = item._id;
    tr.insertCell(i++).innerText = item.urlVideo;
    tr.insertCell(i++).appendChild(actions);

  });
}

let add = () => {
  document.location.href = 'edit.html';
}
