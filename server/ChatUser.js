class ChatUser {
  constructor(chatServer, socket, userId) {
    this.chatServer = chatServer;
    this.socket = socket;
    this.userId = userId;
    this.username = `user${this.userId}`;

    this.sendInitializeInfo = this.sendInitializeInfo.bind(this);
    this.sendConnectedMessage = this.sendConnectedMessage.bind(this);
    this.sendDisconnectedMessage = this.sendDisconnectedMessage.bind(this);

    this.sendInitializeInfo()
    this.sendConnectedMessage()
    this.socket.on('chat message', chatServer.sendMessage);
    this.socket.on('disconnect', this.sendDisconnectedMessage);
  }

  sendInitializeInfo() {
    this.socket.emit('initialize', {
      username: this.username,
      messages: this.chatServer.lastMessages
    })
  }

  sendConnectedMessage() {
    this.chatServer.sendSystemMessage(`${this.username} connected`)
  }

  sendDisconnectedMessage() {
    this.chatServer.sendSystemMessage(`${this.username} disconnected`)
  }

  toJson() {
    return {
      id: this.userId,
      name: this.username
    }
  }
}

module.exports = ChatUser;