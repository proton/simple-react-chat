import React from 'react'
import PropTypes from 'prop-types'

export default class NewMessageForm extends React.Component {
  constructor(props) {
    super(props)

    this.onMessageSend = this.onMessageSend.bind(this)
    this.onMessageTextChange = this.onMessageTextChange.bind(this)

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
      <form className="new-message-form" onSubmit={this.onMessageSend}>
        <input type="text" value={messageText} onChange={this.onMessageTextChange} />
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

NewMessageForm.propTypes = {
  onMessageSend: PropTypes.func.isRequired,
}

