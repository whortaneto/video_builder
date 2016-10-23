function AnswerService() {
  const API_URL = "http://4c-video-builder.tk:9000/api/answers";

  this.getAll = () => {
    return fetch(API_URL)
      .then(function(response) {
        return response.json();
      });
  }

  this.get = (id) => {
    return fetch(API_URL+'/'+id)
      .then(function(response) {
        return response.json();
      });
  }

}

const lessonService = new LessonService();