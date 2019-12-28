import React from 'react'

export default class NewMessageForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      messageText: '',
    }
  }

  onMessageTextChange(event) {
    this.setState({ messageText: event.target.value })
  }

  onMessageSend(event) {
    event.preventDefault()
    this.props.onMessageSend(this.state.messageText)
    this.setState({ messageText: '' })
  }

  render() {
    const { messageText } = this.state
    return (
      <form className="new-message-form" onSubmit={this.onMessageSend.bind(this)}>
        <input type="text" value={messageText} onChange={this.onMessageTextChange.bind(this)} />
        <input type="submit" value="Submit" />
      </form>
    )
  }
}
