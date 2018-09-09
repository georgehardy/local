import React from 'react'

import request from 'superagent'

import * as apiRegister from '../apiRegister'
import RegistrationMap from './RegistrationMap'

export default class RegisterOrg extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      org: '',
      address: '',
      matches: [],
      selection: '',
      coords: {},
      ready: false
    }
  }

  handleChange = (e) => {
    e.preventDefault()
    this.setState({
      [e.target.name]: e.target.value
    })
    e.target.name == 'address' && this.checkAddy()
  }

  handleClick = (address) => {
    this.getCoords(address.a)
  }

  checkAddy () {
    if (this.state.address.length > 1) {
    request
    .get('https://www.addy.co.nz/api/search?s=' + this.state.address)
    .set('addy-api-key', 'ab4da45e1bc44013a86556b00eefb289')
    .then(res => {
      this.setState({matches: res.body.addresses})
    })
  }
  }

  getCoords (selection) {
    console.log(selection)
    const reqString = 'http://www.mapquestapi.com/geocoding/v1/address?key=DRKly60NLBpFkRjJHCNTAFdbFAKMmqOO&location="' + selection + ',New Zealand"'
    console.log(reqString)
    request
    .get(reqString)
    .then(res => {
      this.setState({
        coords: res.body.results[0].locations[0].latLng,
        selection,
        ready: true
      })
    })
  }

  renderStageOne () {
    return (
      <h1></h1>
    )
  }

  renderAutoComplete () {
    return (
      <div>
        Business/Organisation name: <br />
        <input name='org' onChange={this.handleChange} /> <br />
        Address: <br />
        <input name='address' autoComplete='off' onChange={this.handleChange} />
        <ul>
          {
              this.state.matches.map(x => {
                return <li key={x.id}><a href='#' onClick={() => this.handleClick(x)}>{x.a}</a></li>
            })
          }
        </ul>
      </div>
    )
  }

  render () {
    return (
      <div id='reg-container'>
        <h3>[RegisterOrg]</h3>
        <div id='reg-form'>
        <h2>Registration</h2>
        {!this.state.selection && this.renderAutoComplete()}

        {this.state.selection && <RegistrationMap coords={this.state.coords}/>}
        <button>Submit</button>
        </div>
      </div>
    )
  }
}
