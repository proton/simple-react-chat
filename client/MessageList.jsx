import React from 'react'

import ChatMessage from './ChatMessage'

const MessageList = ({ messages }) => (
  <ul className="messages">
    {messages.map((message, index) => (
      <ChatMessage message={message} key={index} />
          ))}
  </ul>
)

export default MessageList
