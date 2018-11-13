import React from 'react';
const io = require('socket.io-client')
const socket = io.connect('http://localhost:9000')

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: true,
      messages: [],
      newMessageText: ''
    };
  }

  onNewMessageTextChange(event) {
    this.setState({newMessageText: event.target.value});
  }

  onNewMessageSend(event) {
    event.preventDefault();
    socket.emit('chat message', this.state.newMessageText);
  }


  componentDidMount() {
    socket.on('chat message', (msg) => {
      const messages = this.state.messages.slice();
      this.setState({
        isLoaded: true,
        messages: messages.concat([msg]),
      });
    });
  }

  render() {
    const { error, isLoaded, messages } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <div>
            <ul id="messages">
            {messages.map((item, index) => ( 
                <li key={index}>
                  {item}
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
