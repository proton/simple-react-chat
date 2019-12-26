import React from 'react'

const io = require('socket.io-client')

const socket = io.connect('http://localhost:9000')

export default class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      users: [],
      newMessageText: '',
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

  onNewMessageTextChange(event) {
    this.setState({ newMessageText: event.target.value })
  }

  onNewMessageSend(event) {
    event.preventDefault()
    socket.emit('chat message', {
      text: this.state.newMessageText,
    })
    this.setState({ newMessageText: '' })
  }

  renderNotReady() {
    return <div>Loading...</div>
  }

  renderReady() {
    const { messages, users, currentUser } = this.state
    return (
      <div>
        <div>
          <ul className="messages">
            {messages.map((message, index) => (
                message.username ? (
                  <li className="messages-message" key={index}>{message.username}: {message.text}</li>
                ) : (
                  <li className="messages-message messages-message-system" key={index}>{message.text}</li>
                )
              ))}
          </ul>
          <ul className="users">
            {users.map((user, _index) => (
              <li key={user.id} className={`users-user${user.id === currentUser.id ? ' users-user-current' : ''}`}>
                {user.name}
              </li>
              ))}
          </ul>
        </div>
        <div>
          <form className="new-message-form" onSubmit={this.onNewMessageSend.bind(this)}>
            <input type="text" value={this.state.newMessageText} onChange={this.onNewMessageTextChange.bind(this)} />
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    )
  }

  render() {
    const { ready } = this.state
    return ready ? this.renderReady() : this.renderNotReady()
  }
}
