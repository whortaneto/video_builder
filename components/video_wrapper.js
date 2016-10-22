const VideoBuilder = {};

VideoBuilder.wrapper = (function () {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    tag.asyn = true;

    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    return function (container, height, width, url) {
        let _player = null;
        let timersListeners = {
            timers: [],
            callbacks: [],
        };
        let listenToEvents = false;

        window.onYouTubeIframeAPIReady = () => {
            _player = new YT.Player(container.id , {
                height: height,
                width: width,
                videoId: url,
                events: {
                'onReady': _onPlayerReady,
                }
            });
        }

        const _onPlayerReady = () => {
            _player.playVideo()
            if (!!listenToEvents) {
                setInterval(() => {
                    let index = timersListeners.timers.map(e => Math.round(e))
                                    .indexOf(Math.round(_getCurrentTime()));
                    if(index > -1) {
                        timersListeners.callbacks[index]();
                    }   
                }, 1000)
            }
        }

        const _addTimeListener = (time, callback) => {
            timersListeners.timers.push(time);
            timersListeners.callbacks.push(callback);

        };

        const _pauseVideo = () => _player.pauseVideo();

        const _playVideo = () => _player.playVideo();

        const _getTimers = () => timersListeners;

        const _getCurrentTime = () =>  _player.getCurrentTime();

        const _setListenEvents = value => listenToEvents = value;

        return {
            getCurrentTime: _getCurrentTime,
            addTimeListener: _addTimeListener,
            getTimers: _getTimers,
            setListenEvents: _setListenEvents,
            pauseVideo: _pauseVideo,
            playVideo: _playVideo,
        }
    }
})();
