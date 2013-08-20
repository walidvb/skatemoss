(function($){
  $(document).ready(function(){
    var messages = [];
    var serverAddress = "Walid.local:3000"
    var socket = io.connect(serverAddress);
    var items = $('.item');

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
    setTimeout(function(){$('#main ul').masonry()}, 1000);
  });
}(jQuery));