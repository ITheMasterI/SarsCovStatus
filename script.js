function messageSent (data) {
  $('#messages').prepend(`
  <p>
  <hr />
  <strong>${data.id}</strong><br />
  ${data.message}
  </p>
  `);
  }
  socket.on('socket.joined', function (user) {

  $('#send-to').append(`<option>${user.userId}</option>`);
  });
  socket.on('message.sent', messageSent);
  $(function () {
  $('#message-form').on('submit', function (e) {
  e.preventDefault();
  messageSent({
  id: 'Message Sent to ' + $('#send-to').val(),
  message: $('#message').val()
  });
  socket.emit('message.send', {
  id: $('#send-to').val(),
  message: $('#message').val()
  });
  });
  });
