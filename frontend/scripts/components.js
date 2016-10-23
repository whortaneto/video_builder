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