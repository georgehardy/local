import React from 'react'

import Register from './Register'

export default class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      userId: 0,
      stage: 0
    }
  }

  render () {
    return (
      <div id='login'>
        LOGIN
      </div>
    )
  }
}
