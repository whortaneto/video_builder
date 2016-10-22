const Facebook = (function () {
  return function () {

    let _initialize = () => {
      window.fbAsyncInit = function() {
        FB.init({
          appId  : '140930386116345',
          status : true, // check login status
          cookie : true, // enable cookies to allow the server to access the session
          xfbml  : true  // parse XFBML
        });
      };
    }

    let _share = (shareButton) => {

      (function() {
        var e = document.createElement('script');
        e.src = 'http://connect.facebook.net/en_US/all.js';
        e.async = true;
        document.querySelector('body').appendChild(e);
      }());

      shareButton.onclick = (e) => {
        e.preventDefault();

        FB.ui({
          method: 'feed',
          link: 'http://4cvideobuilder.tk',
          name: "Video Builder",
          caption: "Video Builder",
          description: "Video Builder",
          picture: 'http://www.hyperarts.com/_img/TabPress-LOGO-Home.png',
        }, function(response) {
          if (response && response.post_id) {
            //alert('Post was published.');
            resolve('200');
          } else {
            reject(new Error('User not shared!!!'));
          }
        });
      }
    }

    _initialize();

    return {
      share: _share
    }

  }
})();

const facebook = Facebook();