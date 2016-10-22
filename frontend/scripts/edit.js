const API_URL = "http://localhost:9000/api/lessons";

window.onload = () => {
  loadLessons();
}

let loadLessons = (api) => {
  fetch(API_URL)
    .then(function(response) {
      return response.json();
    })
    .then(function(result) {
      fillDataTable(
        document.getElementById('tbody'),
        result
      );
    });
}

let fillDataTable = (domTbleBody, data) => {
  data.forEach(item => {
    let tr = domTbleBody.insertRow();

    tr.onclick = () => {
      if (document.querySelector('.clickedRow')) {
        document.querySelector('.clickedRow').classList.remove("clickedRow")
      }
      tr.classList.add('clickedRow');
      console.log(item.urlVideo);
    }

    tr.align = 'center';
    let i =0;;
    tr.insertCell(i++).innerText = item._id;
    tr.insertCell(i++).innerText = item.urlVideo;

  });
}

let add () => {
  document.location.href = 'lesson';
}
