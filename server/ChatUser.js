class ChatUser {
  constructor(chatServer, socket, userId) {
    this.chatServer = chatServer
    this.socket = socket
    this.userId = userId
    this.username = `user${this.userId}`

    this.sendInitializeInfo = this.sendInitializeInfo.bind(this)

    this.sendInitializeInfo()
    this.socket.on('chat message', message => chatServer.sendMessage({ username: this.username, message }))
    this.socket.on('disconnect', _ => chatServer.onDisconnection(this))
  }

  sendInitializeInfo() {
    this.socket.emit('initialize', {
      user: this.toJson(),
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
