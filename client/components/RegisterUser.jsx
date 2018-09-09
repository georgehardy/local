import React from 'react'
import {pick as _pick, clone as _clone} from 'lodash';

import * as apiRegister from '../apiRegister'

export default class RegisterUser extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirm: '',
      errors: []
    }
  }

  handleChange = (e) => {
    e.preventDefault()
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = () => {
    this.validateForm()
  }

  validateForm = () => {
    const user = _pick(_clone(this.state), ['firstName', 'lastName', 'email', 'password'])
    const errors = []

    user.firstName.length < 1 && errors.push({id: 1, message: 'You must enter your first name.'})
    user.lastName.length < 1 && errors.push({id: 2, message: 'You must enter your last name.'})
    user.email.length < 1 && errors.push({id: 3, message: 'You must enter an email address.'})
    user.password.length < 8 && errors.push({id: 4, message: 'Your password must be at least 8 characters.'})
    user.password !== this.state.passwordConfirm && errors.push({id: 5, message: 'Passwords do not match.'})

    if (errors.length == 0) {
    apiRegister.addUser(user)
      .then(result => {
        result.success ? this.userCreated(result.message.id) : errors.push({id: 6, message: result.message.error})
        this.setState({ errors })
      })
    } else {
      this.setState({ errors })
    }
  }

  userCreated = (id) => {
    this.props.callback(id)
  }

  render () {
    return (
      <div id='reg-user'>
        <h3>[RegisterUser]</h3>
        <div id='reg-user-form'>
          <label>First Name</label><br /><input name='firstName' onChange={this.handleChange} /> <br />
          <label>Last Name</label><br /><input name='lastName' onChange={this.handleChange} /> <br />
          <label>Email</label><br /><input name='email' onChange={this.handleChange} /> <br />
          <label>Password</label><br /><input name='password' type='password' onChange={this.handleChange} /> <br />
          <label>Confirm Password</label><br /><input name='passwordConfirm' type='password' onChange={this.handleChange} /> <br />
          <div id='reg-errors'>
            {this.state.errors.map(x => <p key={x.id}>{x.message}</p>)}
          </div>
          <button onClick={this.handleSubmit}>Submit</button>
        </div>
      </div>
    )
  }
}
