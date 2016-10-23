var CourseBuilder = CourseBuilder || {};

CourseBuilder.videoWrapper = (function () {
    const youtubeApi = document.createElement('script');
    youtubeApi.src = "https://www.youtube.com/iframe_api";
    youtubeApi.asyn = true;

    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(youtubeApi, firstScriptTag);

    return function (height, width, url) {
        let _player = null;
        let timersListeners = {
            timers: [],
            callbacks: [],
            view: []
        };
        let listenToEvents = false;

        const container = document.querySelector('videoView');
        container.id = 'videoContainer';
        const playerDiv = document.createElement('div');
        playerDiv.id = 'videoPlayer';

        container.appendChild(playerDiv);

        window.onYouTubeIframeAPIReady = () => {
            _player = new YT.Player(playerDiv.id , {
                height: height,
                width: width,
                videoId: url,
                events: {
                'onReady': _onPlayerReady,
                }
            });

            const videoReady = new Event('videoReady');
            container.dispatchEvent(videoReady);
        }

        const _onPlayerReady = () => {
            _player.playVideo()
            if (!!listenToEvents) {
                setInterval(() => {
                    let index = timersListeners.timers.map(e => Math.floor(e))
                                    .indexOf(Math.floor(_getCurrentTime()));
                    if(index > -1 && !!timersListeners.view[index]) {
                        timersListeners.callbacks[index]();
                        timersListeners.view[index - 1] = false;
                        timersListeners.view[index] = false;
                    }   
                }, 500)
            }
        }

        const _addTimeListener = (time, callback) => {
            timersListeners.timers.push(time);
            timersListeners.callbacks.push(callback);
            timersListeners.view.push(true);
        };

        const _onVideoReady = callback => {
            container.addEventListener('videoReady', callback, false);
        };

        const _pauseVideo = () => _player.pauseVideo();

        const _playVideo = () => _player.playVideo();

        const _getTimers = () => timersListeners;

        const _getCurrentTime = () =>  _player.getCurrentTime();

        const _getContainer = () =>  container;

        const _setListenTimers = value => listenToEvents = value;

        return {
            getContainer: _getContainer,
            getCurrentTime: _getCurrentTime,
            addTimeListener: _addTimeListener,
            getTimers: _getTimers,
            setListenTimers: _setListenTimers,
            pauseVideo: _pauseVideo,
            playVideo: _playVideo,
            onVideoReady: _onVideoReady,
        }
    }
})();
