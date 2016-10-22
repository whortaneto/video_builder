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

    var actions = document.createElement('div');
    actions.appendChild(createButton(edit, 'Edit', 'glyphicon glyphicon-pencil'));
    actions.appendChild(createButton(remove, 'Remove', 'glyphicon glyphicon-trash'));

    let i =0;
    tr.insertCell(i++).innerText = item._id;
    tr.insertCell(i++).innerText = item.urlVideo;
    tr.insertCell(i++).appendChild(actions);

  });
}

let createButton = (onclick, name, className) => {
  var button = document.createElement('button');
  button.setAttribute('class', 'btn btn-primary btn-xs my-xs-btn');
  button.setAttribute('type', 'button');
  button.onclick = onclick;

  var span = document.createElement('span');
  span.setAttribute('class', className);
  span.innerHTML = name;
  button.appendChild(span);

  return button;
}

let add = () => {
  document.location.href = 'edit.html';
}
