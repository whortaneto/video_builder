var CourseBuilder = CourseBuilder || {};
 
CourseBuilder.video = (function () {
    return function (height, width, key) {
        let video = null;
        let questions = [];
        let answerAttempts = [];
        let modalContainer = document.createElement('div');
        let dataSource = "http://4c-video-builder.tk:9000/api/lessons/";

        let modal = null;
        modal = CourseBuilder.questionModal();
        modal.setContainer(modalContainer);
        modal.render();
        modal.onSend(function (value) {
            let answer = modal.getValue().choices
                .filter(item => item.text === value)[0];

            const addAttempt = () => {
                let answerAttempt = {
                    attempt: answerAttempts.length + 1,
                    text: answer.text,
                    isCorrect: answer.isCorrect
                }

                answerAttempts.push(answerAttempt);
            }

            if(!!answer) {
                addAttempt();
                if(answer.isCorrect) {
                    video.playVideo();
                    modal.hide();
                    modal.setValue(_next());
                    _sendAnswerAttempts();
                } else {
                    modal.addError("wrong answer");
                }
            }
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

        const _sendAnswerAttempts = () => {
            var answer =   {
                user: "levy",
                lesson: key,
                question: modal.getValue().question,
                attempts: answerAttempts
            }

            console.log(answer);
        };        

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
