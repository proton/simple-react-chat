import React from 'react'
import PropTypes from 'prop-types'

export default class UserList extends React.Component {
  constructor(props) {
    super(props)

    this.onUserClick = this.onUserClick.bind(this)
  }

  onUserClick(user) {
    if (!this.isCurrentUser(user)) return

    const newUserName = prompt('Please enter your name', this.props.currentUser.name)
    this.props.onCurrentUserNameChange(newUserName)
  }

  isCurrentUser(user) {
    return this.props.currentUser.id === user.id
  }

  renderUser(user) {
    const className = this.isCurrentUser(user) ? 'user-list__user user-list__user__current' : 'user-list__user'
    return <li key={user.id} className={className} onClick={() => this.onUserClick(user)}>{user.name}</li>
  }

  render() {
    const { users } = this.props

    return (
      <ul className="user-list">
        {users.map(user => this.renderUser(user))}
      </ul>
    )
  }
}

UserList.propTypes = {
  currentUser: PropTypes.object.isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  onCurrentUserNameChange: PropTypes.func.isRequired,
}
