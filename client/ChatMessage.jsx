import React from 'react'
import PropTypes from 'prop-types'

export default class ChatMessage extends React.Component {
  renderUserMessage({ message, key }) {
    return <li className="message-list__message" key={key}><b>{message.username}</b>: {message.text}</li>
  }

  renderSystemMessage({ message, key }) {
    return <li className="message-list__message message-list__message__system" key={key}>{message.text}</li>
  }

  render() {
    const { message, key } = this.props

    return message.username ?
      this.renderUserMessage({ message, key }) :
      this.renderSystemMessage({ message, key })
  }
}

ChatMessage.propTypes = {
  key: PropTypes.number.isRequired,
  message: PropTypes.object.isRequired,
}
