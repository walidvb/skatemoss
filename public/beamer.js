(function($){
  $(document).ready(function(){
  //var serverAddress = "http://skatemoss.herokuapp.com/";
  var serverAddress = "Walid.local:3000"
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
    var id = $(this).find('img').attr('img');
    $('.'+selectedClass).removeClass(selectedClass);
    $(this).addClass(selectedClass);

    socket.emit('send', {
      id: id,
      img:img
    });
  });
});
}(jQuery));