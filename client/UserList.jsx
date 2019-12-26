import React from 'react'

export default class UserList extends React.Component {
  isCurrentUser(user) {
    return this.props.currentUser.id === user.id
  }

  renderUser(user) {
    const className = this.isCurrentUser(user) ? 'users-user users-user-current' : 'users-user'
    return <li key={user.id} className={className}>{user.name}</li>
  }

  render() {
    const { users } = this.props

    return (
      <ul className="users">
        {users.map(user => this.renderUser(user))}
      </ul>
    )
  }
}
