class ChatUser {
  constructor(chatServer, socket, userId) {
    this.chatServer = chatServer
    this.socket = socket
    this.userId = userId
    this.username = `user${this.userId}`

    this.sendInitializeInfo = this.sendInitializeInfo.bind(this)

    this.sendInitializeInfo()
    this.socket.on('chat message', ({ text }) => chatServer.sendMessage({ username: this.username, text }))
    this.socket.on('disconnect', _ => chatServer.onDisconnection(this))
    this.socket.on('username change', ({ username }) => {
      this.username = username
      chatServer.notifyUserListUpdate()
    })
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
