let createButton = (onclick, name, className) => {
  var button = document.createElement('button');
  button.setAttribute('class', 'btn btn-xs btn-primary');
  button.setAttribute('type', 'button');
  button.onclick = onclick;

  var span = document.createElement('span');
  span.setAttribute('class', className);
  span.innerHTML = name;
  button.appendChild(span);

  return button;
}

const primaryButton = (onclick, name) => {
  let button = document.createElement('button')
  button.setAttribute('class', 'btn btn-xs btn-primary')
  button.setAttribute('type', 'button')
  button.onclick = onclick
  let span = document.createElement('span')
  span.innerHTML = name
  button.appendChild(span)
  return button
}


const dangerButton = (onclick, name) => {
  let button = document.createElement('button')
  button.setAttribute('class', 'btn btn-xs btn-danger')
  button.setAttribute('type', 'button')
  button.onclick = onclick
  let span = document.createElement('span')
  span.innerHTML = name
  button.appendChild(span)
  return button
}