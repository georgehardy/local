import React from 'react'
import {getAllUsers} from '../apiClient'

export default class Signup extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      users: []
    }
  }

  componentDidMount () {
    getAllUsers()
      .then(users => {
        this.setState({users})
      })
  }

  render () {
    return (
      <div>
        <h2>Registration</h2>
        {this.state.users.map(users => (
          <div key={users.id}>
            {users.firstName}
          </div>
        ))}
      </div>
    )
  }
}