import React from 'react'
//import {pick as _pick, clone as _clone} from 'lodash';

// import * as apiRegister from '../apiRegister'
import Header from './Header'
import Register from './Register'
import Main from './Main'

export default class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      userToken: null,
      loggedIn: false,
      action: 'home'
    }
  }

  login = () => {
    this.setState({
      loggedIn: true,
      action: 'main'
    })
  }

  logout = () => {
    this.setState({
      loggedIn: false,
      action: 'home'
    })
  }

  callbackAction = (action) => {
    this.setState({action})
  }

  render () {
    const action = this.state.action
    return (
      <div id='local'>
        <Header callback={this.callbackAction} loggedIn={this.state.loggedIn} showButtons={true}/>
        <div id='container'>
          {action === 'home' && <h3>[Homepage content will go here]</h3>}
          {action === 'login' && this.login()}
          {action === 'logout' && this.logout()}
          {action === 'register' && <Register callback={this.callbackAction}/>}
          {action === 'main' && <Main />}
        </div>
        <div id='footer'>
          <p>[Footer]</p>
        </div>
      </div>
    )
  }
}
