class ChatUser {
  constructor(chatServer, socket, userId) {
    this.chatServer = chatServer
    this.socket = socket
    this.userId = userId
    this.username = `user${this.userId}`

    this.sendInitializeInfo = this.sendInitializeInfo.bind(this)

    this.sendInitializeInfo()
    this.socket.on('chat message', chatServer.sendMessage)
    this.socket.on('disconnect', _ => chatServer.onDisconnection(this))
  }

  sendInitializeInfo() {
    this.socket.emit('initialize', {
      username: this.username,
      messages: this.chatServer.lastMessages,
    })
  }

  toJson() {
    return {
      id: this.userId,
      name: this.username,
    }
  }
}

module.exports = ChatUser
