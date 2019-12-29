import React from 'react'
import PropTypes from 'prop-types'

export default class UserList extends React.Component {
  isCurrentUser(user) {
    return this.props.currentUser.id === user.id
  }

  renderUser(user) {
    const className = this.isCurrentUser(user) ? 'user-list__user user-list__user__current' : 'user-list__user'
    return <li key={user.id} className={className}>{user.name}</li>
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
}
