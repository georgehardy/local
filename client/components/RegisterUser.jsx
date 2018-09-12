import React from 'react'
import {pick as _pick, clone as _clone} from 'lodash';

import {addUser} from '../apiRegister'

export default class RegisterUser extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirm: '',
      errors: [],
      errorList: {}
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
    const errorList = {}
    user.firstName.length < 1 && (errorList.firstName = 'You must enter your first name.')
    user.lastName.length < 1 && (errorList.lastName = 'You must enter your last name.')
    user.email.length < 1 && (errorList.email = 'You must enter an email address.')
    user.password.length < 8 && (errorList.password = 'Your password must be at least 8 characters.')
    user.password !== this.state.passwordConfirm && (errorList.passwordConfirm = 'Passwords do not match.')

    if (Object.keys(errorList).length === 0) {
    addUser(user)
      .then(result => {
        if (result.success) {
          this.userCreated(result.message.id)
        } else {
          errorList.email = result.message.error
          this.setState({ errorList })
        }     
      })
  } else {
      this.setState({ errorList })
    }
  }

  userCreated = (id) => {
    this.props.callback(id)
  }

  render () {
    const err = this.state.errorList
    return (
      <div id='reg-user'>
          <h2>Register as a new user</h2>
          <ul className='reg-form'>
            <li><label>First Name<span className='errmsg'>{err.firstName}</span></label>
            <input name='firstName' onChange={this.handleChange} autocomplete="off" /> <br /></li>

            <li><label>Last Name<span className='errmsg'>{err.lastName}</span></label>
            <input name='lastName' onChange={this.handleChange} autocomplete="off" /> <br /></li>

            <li><label>Email<span className='errmsg'>{err.email}</span></label>
            <input name='email' onChange={this.handleChange} autocomplete="off" /> <br /></li>
            
            <li><label>Password<span className='errmsg'>{err.password}</span></label>
            <input name='password' type='password' onChange={this.handleChange} autocomplete="off" /> <br /></li>

            <li><label>Confirm Password<span className='errmsg'>{err.passwordConfirm}</span></label>
            <input name='passwordConfirm' type='password' onChange={this.handleChange} autocomplete="off" /> <br /></li>
        </ul>
          <button onClick={this.handleSubmit}>Submit</button>
      </div>
    )
  }
}
