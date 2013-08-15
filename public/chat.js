window.onload = function(){

  var messages = [];
  var socket = io.connect('http://radiant-hamlet-2503.herokuapp.com/');
  var field = document.getElementById("field");
  var sendButton = document.getElementById("send");
  var content = document.getElementById("content");

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

  sendButton.onclick = function() {
    var text = field.value;
    field.value = '';
    socket.emit('send', {
      message: text
    });
  }
}