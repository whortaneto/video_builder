let lesson = {
  "urlVideo": "XXXXXXXXXXXXXXX",
  "questions": [
    {
      "time": 120,
      "question": "What is this bird?",
      "_id": "580af00182d373160f0d90b3",
      "choices": [
        {
          "isCorrect": true,
          "text": "Pardal",
          "_id": "580b4eb76be8610537d719d9"
        }
      ]
    }
  ]
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
}

let save = () => {
  lesson.urlVideo = document.querySelector('#urlVideo').value;

  let requestBody = JSON.stringify(lesson);
  lessonService.save(requestBody);
}

let back = () => {
  document.location.href = 'index.html';
}

let getURLParameter = (name) => {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}