const server = require('http').createServer()
const io = require('socket.io')(server)

let usernameIncrement = 1;

io.on('connection', function(socket){
  let username = `user${usernameIncrement}`;
  ++usernameIncrement;
  socket.emit('initialize', {
    username: username
  });
  
  io.emit('chat message', {
    username: '***',
    text: `${username} connected`
  });
	socket.on('disconnect', function(){
    io.emit('chat message', {
      username: '***',
      text: `${username} disconnected`
    });
  });
	socket.on('chat message', (message) => { io.emit('chat message', message) });
});

server.listen(9000, function (err) {
  if (err) throw err
  console.log('listening on port 9000')
})
