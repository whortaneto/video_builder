var CourseBuilder = CourseBuilder || {};
 
CourseBuilder.video = (function () {
    return function (height, width, key) {
        let video = null;
        let questions = [];
        let modalContainer = document.createElement('div');
        let dataSource = "http://4c-video-builder.tk:9000/api/lessons/";

        let modal = null;
        modal = CourseBuilder.questionModal();
        modal.setContainer(modalContainer);
        modal.render();
        modal.onClose(function () {
            video.playVideo();
            modal.setValue(_next());
        });

        fetch(dataSource + key).then(response => {
                return response.json();
        }).then(lesson => {
            questions = lesson.questions;
            videoKey = lesson.urlVideo.replace('https://www.youtube.com/watch?v=', '');

            video = CourseBuilder.videoWrapper(height, width, videoKey);
            video.setListenTimers(true);

            video.onVideoReady(() => {
                video.getContainer().appendChild(modalContainer);
            });
            questions[0].index = 1;

            questions[1].index = 2;

            questions[2].index = 3;

            modal.setValue(questions[0]);
            _setListeners();
        });

        

        const _next = () => questions.filter(element => element.index === modal.getValue().index + 1)[0];

        const _timeListener = () => {
            modal.show();
            video.pauseVideo();
        }

        const _setListeners = () => {
            const len = questions.length;
            for(let i = 0; i < len; i++) {
                video.addTimeListener(questions[i].time, _timeListener);
            }
        }
        
        return {}
    }
})();
