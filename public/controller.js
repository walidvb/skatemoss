(function($){
  $(document).ready(function(){
  //var serverAddress = "http://radiant-hamlet-2503.herokuapp.com/";
  var serverAddress = "Walid.local:3000"
  var messages = [];
  var socket = io.connect(serverAddress);
  var items = $('.item');

  socket.on('message', function(data){
    if(data.message)
    {
      messages.push(data.message);
      var html = '';
      for(var i=0; i<messages.length; i++)
      {
        html += messages[i] + '<br />';
      }
      content.innerHTML = html;
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