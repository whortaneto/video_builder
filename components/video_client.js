var CourseBuilder = CourseBuilder || {};

CourseBuilder.video = (function () {
    /*const video_wrapper_script = document.createElement('script');
    video_wrapper_script.src = "video_wrapper.js";
    video_wrapper_script.asyn = true;

    const question_modal_script = document.createElement('script');
    question_modal_script.src = "question_modal.js";
    question_modal_script.asyn = true;

    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(video_wrapper_script, firstScriptTag);
    firstScriptTag.parentNode.insertBefore(question_modal_script, firstScriptTag);*/

    return function (container, height, width, url) {
        let questions = [];

        let modalContainer = document.createElement('div');
        document.querySelector("body").appendChild(modalContainer);

        let video = CourseBuilder.videoWrapper(container, height, width, url);
        video.setListenTimers(true);

        let modal = CourseBuilder.questionModal();
        modal.setContainer(modalContainer);
        modal.render();

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

        _getData = (() => {
            questions = [
                {   
                    index: 1,
                    time: 1,
                    question: "Vc e besta e?",
                    choices: [
                        {
                            text: "sim",
                            isCorrect: true
                        },
                        {
                            text: "nao",
                            isCorrect: false
                        }
                    ]
                },
                {
                    index: 2,
                    time: 3,
                    question: "Bebesse foi?",
                    choices: [
                        {
                            text: "sim",
                            isCorrect: true
                        },
                        {
                            text: "nao",
                            isCorrect: false
                        }
                    ]
                },
                {
                    index: 3,
                    time: 5,
                    question: "Egua?",
                    choices: [
                        {
                            text: "sim",
                            isCorrect: true
                        },
                        {
                            text: "nao",
                            isCorrect: false
                        }
                    ]
                }
            ]
            modal.setValue(questions[0]);
            _setListeners();
        })();

        modal.onClose(function () {
            video.playVideo();
            modal.setValue(_next());
        });

        return {}
    }
})();
