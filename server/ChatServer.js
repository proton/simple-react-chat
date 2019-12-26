const ChatUser = require('./ChatUser.js');

class ChatServer {
  constructor(server) {
    this.userIdIncrement = 0;
    this.lastMessages = [];
    this.chatUsers = [];
    this.io = require('socket.io')(server);

    this.onConnection = this.onConnection.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.sendSystemMessage = this.sendSystemMessage.bind(this);

    this.io.on('connection', this.onConnection);
  }

  onConnection(socket) {
    const chatUser = new ChatUser(this, socket, ++this.userIdIncrement);
    this.chatUsers.push(chatUser);
    this.io.emit('userlist updated', this.chatUsers.map(user => user.toJson()));
  }

  sendMessage(message) {
    this.lastMessages = this.lastMessages.slice(-10);
    this.lastMessages.push(message);
    this.io.emit('chat message', message);
  }

  sendSystemMessage(text) {
    this.sendMessage({
      username: '***',
      text: text
    });
  }
}

module.exports = ChatServer;