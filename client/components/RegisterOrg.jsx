import React from 'react'

import {addOrg} from '../apiRegister'
import {addyAutoComplete, mqGeocode} from '../apiLocation'
import RegistrationMap from './RegistrationMap'
import {pick as _pick, clone as _clone} from 'lodash';

export default class RegisterOrg extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      org: '',
      address: '',
      matches: [],
      matchedAddress: '',
      coords: {},
      error: '',
      stage: 0
    }
  }

  handleChange = (e) => {
    e.preventDefault()
    this.setState({
      [e.target.name]: e.target.value
    })
    e.target.name == 'address' && this.checkAddy()
  }

  handleSelection = (address) => {
    this.getCoords(address.a)
  }

  handleSubmit = () => {
    const org = {
    name: this.state.org,
    address: this.state.matchedAddress,
    lat:this.state.coords.lat,
    lng: this.state.coords.lng
    }
    addOrg(org, this.props.userId)
      .then(() => this.props.callback())
      .catch(err => {
        // error
        console.log(err)
      })
  }

  handleEdit = () => {
    this.setState({matchedAddress: ''})
  }

  checkAddy () {
    if (this.state.address.length > 1) {
      addyAutoComplete(this.state.address)
        .then(res => {
          this.setState({matches: res.body.addresses})
        })
    }
  }

  getCoords (matchedAddress) {
    this.state.org.length == 0
      ? this.setState({error: `Please enter a business/organisation name before confirming your address.`})
      : mqGeocode(matchedAddress)
          .then(res => {
            this.setState({
              coords: res.body.results[0].locations[0].latLng,
              matchedAddress
            })
            console.log(this.state.coords)
          })
  }

  renderQuestion () {
    return (
      <div>
        <h3>Your account has been registered. Would you like to create a map now?</h3>
        <button onClick={this.registerMap}>Sure!</button>
        <button onClick={this.props.callback}>Maybe later..</button>
      </div> 
    )
  }

  registerMap = () => {
    this.setState({stage:1})
  }

  renderForm () {
    return (
      <div>
        <ul className='reg-form'>
        <h3>Enter the name and address of your organisation.</h3>
        <p>Don't worry, you can always update this later.</p>
          <li><label>Business/Organisation name:<span className='errmsg'>{this.state.error}</span></label><input name='org' onChange={this.handleChange} value={this.state.org} autocomplete="off" /> <br /></li>
          <li><label>Address:</label><input name='address' onChange={this.handleChange} value={this.state.address} autocomplete="off" /><br /></li>
        </ul>
        <ul className='reg-autocomplete'>
          {this.state.matches.map(x => <li key={x.id}><a href='#' onClick={() => this.handleSelection(x)}>{x.a}</a></li>)}
        </ul>
      </div>
    )
  }

  renderMap () {
    return (
      <div id='reg-map'>
        <h2>Is this you?</h2>
        <h3>{this.state.org}</h3>
        <h3>{this.state.matchedAddress}</h3>
        <RegistrationMap coords={this.state.coords}/>
        <button onClick={this.handleEdit}>&lt; Edit</button>
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    )
  }

  render () {
    return (
      <div id='reg-org'>
        {
          this.state.stage == 0
            ? this.renderQuestion()
            : this.state.matchedAddress
              ? this.renderMap()
              : this.renderForm()
        }
      </div>
    )
  }
}
