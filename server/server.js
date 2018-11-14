const server = require('http').createServer()
const io = require('socket.io')(server)

let usernameIncrement = 1;
let lastMessages = [];

io.on('connection', (socket) => {
  let username = `user${usernameIncrement}`;
  ++usernameIncrement;
  socket.emit('initialize', {
    username: username,
    messages: lastMessages
  });
  
  sendMessage({
    username: '***',
    text: `${username} connected`
  });
	socket.on('disconnect', _ => {
    sendMessage({
      username: '***',
      text: `${username} disconnected`
    });
  });
	socket.on('chat message', (message) => {
    sendMessage(message);
  });
});

function sendMessage(message) {
  lastMessages = lastMessages.slice(-10);
  lastMessages.push(message);
  io.emit('chat message', message);
}

server.listen(9000, (error) => {
  if (error) throw error
  console.log('listening on port 9000')
})
