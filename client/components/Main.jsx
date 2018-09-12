import React from 'react'

import MainMap from './MainMap'

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
      <div id='main'>
        <MainMap />
        <div id="sidebar">sidebar</div>
      </div>
    )
  }
}
