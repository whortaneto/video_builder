# Video Builder - 4c Team

One iteractive video builder that help our course creators easily create and offer amazing content, with tools that lets people build interactive videos.

### Features

- You can create one lesson, based in one Youtube video
- Your lesson can have many stop times to ask custom questions to the user
- All user answers are saved in our backend
- Deployed in Amazon AWS [http://4c-video-builder.tk/edit.html](http://4c-video-builder.tk)   
- Backend with Node JS (Express) and MongoDB
- Pure JS Frontend
- Easy to integrate with your our site 


### How to integrate 

Import our JS .:
```
<Script src = "video_wrapper.js"> </ script>
<Script src = "question_modal.js"> </ script>
<Script src = "video_client.js"> </ script>
```

These files can be founded in:
[Componentes folder](https://github.com/4C-Team/video_builder/tree/master/components)

Add this tag in your html:
```
<VideoView> </ VideoView>
```

Call our API in JS you to load one specific video:
```
CourseBuilder.video ('390', '640', 'ryDeFvtJe');
```

The key is ryDeFvtJe one previous saved lesson video.

### Demo Video
[Link to youtube video demo](https://github.com/4C-Team/)
