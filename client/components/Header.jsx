import React from 'react'

export default class Header extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      userId: 0,
      stage: 0
    }
  }


  loggedIn () {
    return (
      <button id='logout' onClick={this.handleClick}>Logout</button>
    )
  }

  loggedOut () {
    return (
      <span>
        <button id='login' onClick={this.handleClick}>Login</button>
        <button id='register' onClick={this.handleClick}>Register</button>
      </span>
    )
  }

  handleClick = (e) => {
    this.props.callback(e.target.id)
  }

  render () {
    return (
      <div id='header'>
        <span id='logo'><a href='/'>Local</a></span>
        <span id='login-status'>
          {
              this.props.loggedIn
                ? this.loggedIn()
                : this.loggedOut()
          }
        </span>
      </div>
    )
  }
}
