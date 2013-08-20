(function($){
  $(document).ready(function(){
  //var serverAddress = "http://skatemoss.herokuapp.com/";
<<<<<<< HEAD
  //var serverAddress = "Walid.local:3000"
=======
  var serverAddress = "Walid.local:3000"
>>>>>>> efa257333faf7458095ea1a6bc13bf0a2e028f93
  var messages = [];
  var socket = io.connect(serverAddress);
  var items = $('.item');
  console.log(serverAddress);
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