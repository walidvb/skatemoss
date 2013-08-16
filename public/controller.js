(function($){
  $(document).ready(function(){
  var serverAddress = "http://skatemoss.herokuapp.com/";
  //var serverAddress = "Walid.local:3000"
  var messages = [];
  var socket = io.connect(serverAddress);
  var items = $('.item');

  var selectedClass = 'selected';
  items.on('click', function() {
    var id = $(this).attr('data-id');
    $('.'+selectedClass).removeClass(selectedClass);
    $(this).addClass(selectedClass);

    socket.emit('send', {
      id: id
    });
    
  });
  setTimeout(function(){$('#main ul').masonry()}, 1000);
});
}(jQuery));