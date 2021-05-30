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


io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  console.log('token', token);
  next();
});


io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('my message', (msg) => {
    console.log('message: ' + msg);
    io.emit('my broadcast', `server: ${msg}`);
  });
});

server.listen(port);
