import React from 'react';
const io = require('socket.io-client')
const socket = io.connect('http://localhost:9000')

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      users: [],
      newMessageText: '',
      username: null,
      ready: false
    };
  }

  onNewMessageTextChange(event) {
    this.setState({newMessageText: event.target.value});
  }

  onNewMessageSend(event) {
    event.preventDefault();
    socket.emit('chat message', {
      username: this.state.username,
      text: this.state.newMessageText
    });
    this.setState({newMessageText: ''});
  }

  componentDidMount() {
    socket.on('initialize', ({username, messages}) => {
      this.setState({
        ready: true,
        username: username,
        messages: messages
      });
    });
    socket.on('chat message', (msg) => {
      const messages = this.state.messages.slice();
      this.setState({
        messages: messages.concat([msg]),
      });
    });
    socket.on('userlist updated', (users) => {
      this.setState({
        users: users,
      });
    });
  }

  render() {
    const { ready, messages, users } = this.state;
    if (!ready) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <div>
            <ul class="messages">
            {messages.map((message, index) => ( 
                <li key={index}>
                  {message.username}: {message.text}
                </li>
              ))}
            </ul>
            <ul class="users">
            {users.map((user, index) => ( 
                <li key={index}>
                  {user.name}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <form class="new-message-form" onSubmit={this.onNewMessageSend.bind(this)}>
              <input type="text" value={this.state.newMessageText} onChange={this.onNewMessageTextChange.bind(this)} />
              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
      )
    }
  }
}
