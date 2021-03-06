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



const sockets = [];

io.on('connection', (socket) => {
    sockets.push(socket);
    console.log(`New connection ${socket.id}`);
     //io.emit('user.add', socket.id);


    socket.on('chat', function(data){

      for(var i = 0; i < sockets.length; i++){
        sockets[i].send(data)
        console.log(data);



    }
    io.sockets.emit('chat', data);
  });




    socket.on('disconnect', () => {

      io.emit('user.remove', socket.id);

        for(var i = 0; i < sockets.length; i++){
            if(sockets[i].id === socket.id){
                sockets.splice(i, 1); //deleta um elemento do array (posicao, numero de elementos a ser excluido)
            }
        }
        console.log(`o id: ${socket.id} saiu ` + 'agora restam ' + sockets.length + ' online')
    })
})





server.listen(port);

