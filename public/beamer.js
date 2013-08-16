(function($){
  $(document).ready(function(){
  var serverAddress = "http://radiant-hamlet-2503.herokuapp.com/";
  //var serverAddress = "Walid.local:3000"
  var messages = [];
  var socket = io.connect(serverAddress);
  var items = $('.item');

  socket.on('send', function(data){
    if(data.id)
    {
      console.log(data.id);
      window.location.hash = data.id;
    }
    else
    {
      console.log("Problem with ", data);
    }
  });


  var selectedClass = 'selected';
  items.on('click', function() {
    var id = $(this).attr('data-id');
    $('.'+selectedClass).removeClass(selectedClass);
    $(this).addClass(selectedClass);

    socket.emit('send', {
      id: id
    });
  });
});
}(jQuery));