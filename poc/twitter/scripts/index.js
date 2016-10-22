let xx = {};

window.onload = () => {

  twttr.widgets.load(
    document.getElementById("container")
  );

  twttr.ready(
    function (twttr) {

      twttr.widgets.createShareButton(
        'http://videobuilder.com/',
        document.getElementById('new-button'),
        {
          count: 'none',
          text: 'Sharing amazing Video Builder lesson on twitter'
        });

      twttr.events.bind(
        'tweet',
        function (event) {
          debugger;
          alert('Twitter shared !!!');
        }
      );

      twttr.events.bind(
        'click',
        function (ev) {
          debugger;
          xx = ev.target;
        }
      );


    }
  );

}
