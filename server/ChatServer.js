const ChatUser = require('./ChatUser.js')
const socketIo = require('socket.io')

class ChatServer {
  constructor(server) {
    this.userIdIncrement = 0
    this.lastMessages = []
    this.chatUsers = new Map()
    this.io = socketIo(server)

    this.onConnection = this.onConnection.bind(this)
    this.sendMessage = this.sendMessage.bind(this)

    this.io.on('connection', this.onConnection)
  }

  onConnection(socket) {
    this.userIdIncrement += 1
    const chatUser = new ChatUser(this, socket, this.userIdIncrement)
    this.chatUsers.set(chatUser.userId, chatUser)
    this.sendMessage({ text: `${chatUser.username} connected` })
    this.notifyUserListUpdate()
  }

  onDisconnection(chatUser) {
    this.chatUsers.delete(chatUser.userId)
    this.sendMessage({ text: `${chatUser.username} disconnected` })
    this.notifyUserListUpdate()
  }

  notifyUserListUpdate() {
    const chatUsersJson = Array.from(this.chatUsers.values(), user => user.toJson())
    this.io.emit('userlist updated', chatUsersJson)
  }

  sendMessage(message) {
    this.lastMessages = this.lastMessages.slice(-10)
    this.lastMessages.push(message)
    this.io.emit('chat message', message)
  }
}

module.exports = ChatServer
