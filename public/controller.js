(function($){
  $(document).ready(function(){
    var socket = io.connect(serverAddress);
    var items = $('.item');

    //Masonry tweaks

    // send info to server
    var selectedClass = 'selected';

    items.on('click', function() {
      var id = $(this).attr('data-id');
      var img = $(this).find('img').attr('src');
      $('.'+selectedClass).removeClass(selectedClass);
      $(this).addClass(selectedClass);

      socket.emit('send', {
        id: id,
        img: img,
      });
    });
    setTimeout(function(){$('#main').masonry()}, 1000);
  });
}(jQuery));