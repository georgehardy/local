import React from 'react'
//import {pick as _pick, clone as _clone} from 'lodash';

// import * as apiRegister from '../apiRegister'
import RegisterUser from './RegisterUser'
import RegisterOrg from './RegisterOrg'


export default class Register extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      userId: 0,
      stage: 0
    }
  }

  callbackUser = (id) => {
    this.setState({
      userId: id,
      stage: 1
    })
  }

  callbackOrg = () => {
    this.setState({
      stage: 2
    })
  }

  render () {
    return (
      <div id='reg-container'>
        {this.state.stage == 0 && <RegisterUser callback={this.callbackUser} />}
        {this.state.stage == 1 && <RegisterOrg callback={this.callbackOrg} userId={this.state.userId} />}
        {this.state.stage == 2 && this.props.callback('home')}
      </div>
    )
  }
}
