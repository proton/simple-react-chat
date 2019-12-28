import React from 'react'

import MessageList from './MessageList'
import NewMessageForm from './NewMessageForm'
import UserList from './UserList'

const io = require('socket.io-client')

const socket = io.connect('http://localhost:9000')

export default class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      users: [],
      currentUser: { id: null, name: null },
      ready: false,
    }
  }

  componentDidMount() {
    socket.on('initialize', ({ user, messages }) => {
      this.setState({
        ready: true,
        currentUser: user,
        messages,
      })
    })
    socket.on('chat message', (message) => {
      const messages = this.state.messages.slice()
      this.setState({
        messages: messages.concat([message]),
      })
    })
    socket.on('userlist updated', (users) => {
      this.setState({
        users,
      })
    })
  }

  onNewMessageSend(text) {
    socket.emit('chat message', {
      text,
    })
  }

  renderNotReady() {
    return <div>Loading...</div>
  }

  renderReady() {
    const { messages, users, currentUser } = this.state
    return (
      <div>
        <div>
          <MessageList messages={messages} />
          <UserList users={users} currentUser={currentUser} />
        </div>
        <div>
          <NewMessageForm onMessageSend={this.onNewMessageSend} />
        </div>
      </div>
    )
  }

  render() {
    const { ready } = this.state
    return ready ? this.renderReady() : this.renderNotReady()
  }
}
