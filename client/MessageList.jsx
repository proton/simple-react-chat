import React from 'react'
import PropTypes from 'prop-types'

import ChatMessage from './ChatMessage'

const MessageList = ({ messages }) => (
  <ul className="messages">
    {messages.map((message, index) => (
      <ChatMessage message={message} key={index} />
    ))}
  </ul>
)

MessageList.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default MessageList
