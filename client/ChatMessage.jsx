import React from 'react'

export default class ChatMessage extends React.Component {
  renderUserMessage({ message, key }) {
    return <li className="messages-message" key={key}>{message.username}: {message.text}</li>
  }

  renderSystemMessage({ message, key }) {
    return <li className="messages-message messages-message-system" key={key}>{message.text}</li>
  }

  render() {
    const { message, key } = this.props

    return message.username ?
      this.renderUserMessage({ message, key }) :
      this.renderSystemMessage({ message, key })
  }
}
