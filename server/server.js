const ChatServer = require('./ChatServer.js');

const server = require('http').createServer();

let chatServer = new ChatServer(server);

server.listen(9000, (error) => {
  if (error) throw error
  console.log('listening on port 9000')
})
