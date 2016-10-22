function LessonService() {
  const API_URL = "http://localhost:9000/api/lessons";

  this.save = (requestBody) => {
    if(lesson._id==undefined || lesson._id=='') {
      fetch(API_URL, {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Content-Length': requestBody.length
        }),
        body: requestBody
      });
    } else {
      fetch(API_URL+'/'+lesson._id, {
        method: 'PATCH',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Content-Length': requestBody.length
        }),
        body: requestBody
      });
    }
  }
  
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

  this.delete = (id) => {
    return fetch(API_URL+'/'+id, {
      method: 'DELETE'
    });
  }

}

const lessonService = new LessonService();