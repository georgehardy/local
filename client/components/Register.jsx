import React from 'react'
//import {pick as _pick, clone as _clone} from 'lodash';

// import * as apiRegister from '../apiRegister'
import RegisterUser from './RegisterUser'

export default class Register extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      userId: 0
    }
  }

  callbackUser = (id) => {
    this.setState({userId: id})
  }

  callbackOrg = (o) => {
    console.log(o)
  }

  render () {
    return (
      <div>
        <h2>[Register]</h2>
        {this.state.userId == 0 && <RegisterUser callback={this.callbackUser} />}
        {this.state.userId && <RegisterOrg callback={this.callbackOrg} />}
      </div>
    )
  }
}
