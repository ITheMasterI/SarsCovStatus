const http = require('http');
const app = require('./backend/app');
const port = process.env.PORT || 3000;


app.set('port', port);
const server = http.createServer(app);


const io = require('socket.io')(server, {
  cors: {
    origins: ['http://localhost:4200']
  }
});



  io.on('connection', (socket) => {


    console.log(`New connection ${socket.id}`)

    socket.on('disconnect', () => {
      console.log(`Usuário desconectado ${socket.id}`);
    });


    socket.on('chat', function(data){
      io.sockets.emit('chat', data);
  });


  socket.on('typing', function(data){
    io.sockets.emit('typing', data);

});

});


server.listen(port);
