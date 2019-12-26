const ChatUser = require('./ChatUser.js')

class ChatServer {
  constructor(server) {
    this.userIdIncrement = 0
    this.lastMessages = []
    this.chatUsers = new Map()
    this.io = require('socket.io')(server)

    this.onConnection = this.onConnection.bind(this)
    this.sendMessage = this.sendMessage.bind(this)
    this.sendSystemMessage = this.sendSystemMessage.bind(this)

    this.io.on('connection', this.onConnection)
  }

  onConnection(socket) {
    this.userIdIncrement += 1
    const chatUser = new ChatUser(this, socket, this.userIdIncrement)
    this.chatUsers[chatUser.userId] = chatUser
    this.sendSystemMessage(`${this.username} connected`)
    this.notifyUserListUpdate()
  }

  onDisconnection(chatUser) {
    this.chatUsers.delete(chatUser.userId)
    this.sendSystemMessage(`${chatUser.username} disconnected`)
    this.notifyUserListUpdate()
  }

  notifyUserListUpdate() {
    // const chatUsersJson = this.chatUsers.values().map(user => user.toJson())
    // this.io.emit('userlist updated', chatUsersJson)
  }

  sendMessage(message) {
    this.lastMessages = this.lastMessages.slice(-10)
    this.lastMessages.push(message)
    this.io.emit('chat message', message)
  }

  sendSystemMessage(text) {
    this.sendMessage({
      username: '***',
      text,
    })
  }
}

module.exports = ChatServer
