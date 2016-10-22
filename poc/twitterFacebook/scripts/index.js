
window.onload = () => {

  twttr.widgets.load(
    document.getElementById("container")
  );
  
  twttr.widgets.createShareButton(
    'http://videobuilder.com/',
    document.getElementById('new-button'),
    {
      count: 'none',
      text: 'Sharing amazing Video Builder lesson on twitter'
    });
}
