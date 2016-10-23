var CourseBuilder = CourseBuilder || {};
 
CourseBuilder.video = (function () {
    return function (height, width, key) {
        let video = null;
        let questions = [];
        let answerAttempts = [];
        let modalContainer = document.createElement('div');
        let dataSource = "http://4c-video-builder.tk:9000/api/";

        let modal = null;
        modal = CourseBuilder.questionModal();
        modal.setContainer(modalContainer);
        modal.render();
        modal.onSend(function (value) {
            let answer = modal.getValue().choices
                .filter(item => item.text === value)[0];

            if(!!answer) {
                _addAttempt(answer);
                if(answer.isCorrect) {
                    video.playVideo();
                    modal.hide();
                    _sendAnswerAttempts();
                    modal.setValue(_next());
                } else {
                    modal.addError("Wrong answer");
                }
            } else {
                modal.addError("Select one option");
            }
        });

        fetch(dataSource + "lessons/" + key).then(response => {
                return response.json();
        }).then(lesson => {
            questions = lesson.questions;
            videoKey = lesson.urlVideo.replace('https://www.youtube.com/watch?v=', '');

            video = CourseBuilder.videoWrapper(height, width, videoKey);
            video.setListenTimers(true);

            video.onVideoReady(() => {
                video.getContainer().appendChild(modalContainer);
            });

            let index = 1;
            questions.map(item => !item.index ? item.index = index++ : '');

            modal.setValue(questions[0]);
            _setListeners();
        });

        const _sendAnswerAttempts = () => {
            let users = ["Aurindo", "Carlos", "Levy", "Wagner"];

            let answer =   {
                user: users[Math.floor(Math.random()*users.length)],
                lesson: key,
                question: modal.getValue().question,
                attempts: answerAttempts
            }

            let requestBody = JSON.stringify(answer);

            fetch(dataSource + "answers", {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Content-Length': requestBody.length
                }),
                body: requestBody
            });
            
            answerAttempts = [];
        };     

        const _addAttempt = (answer) => {
            let answerAttempt = {
                attempt: answerAttempts.length + 1,
                text: answer.text,
                isCorrect: answer.isCorrect
            }

            answerAttempts.push(answerAttempt);
        }   

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
