import React from 'react';
const io = require('socket.io-client')
const socket = io.connect('http://localhost:9000')

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
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
    socket.on('initialize', ({username}) => {
      this.setState({
        ready: true,
        username: username
      });
    });
    socket.on('chat message', (msg) => {
      const messages = this.state.messages.slice();
      this.setState({
        messages: messages.concat([msg]),
      });
    });
  }

  render() {
    const { ready, messages } = this.state;
    if (!ready) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <div>
            <ul id="messages">
            {messages.map((message, index) => ( 
                <li key={index}>
                  {message.username}: {message.text}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <form onSubmit={this.onNewMessageSend.bind(this)}>
              <input type="text" value={this.state.newMessageText} onChange={this.onNewMessageTextChange.bind(this)} />
              <input type="submit" value="Submit" />
            </form> 
          </div>
        </div>
      )
    }
  }
}
