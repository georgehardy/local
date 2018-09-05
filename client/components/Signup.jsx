import React from 'react'

import request from 'superagent'

export default class Signup extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      unit: '',
      address: '',
      suburb: '',
      city: '',
      postcode: '',
      matches: [],

    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
    e.target.name == 'address' && this.checkAddy()
    console.log('wat')
  }

  handleClick = (address) => {
    console.log('matched to ', address.a)
  }


  checkAddy () {
    if (this.state.address.length > 1) {
    request
    .get('https://www.addy.co.nz/api/search?s=' + this.state.address)
    .set('addy-api-key', 'ab4da45e1bc44013a86556b00eefb289')
    //.set('Access-Control-Allow-Origin', '*')
    .then(res => {
      this.setState({matches: res.body.addresses})
    })
  }
  }

  render () {
    return (
      <div>
        <h2>Registration</h2>
        <p>Address: <input name='address' onChange={this.handleChange} /></p>
        <ul>{
            this.state.matches.map(x => {
              return <li key={x.id}><a href='#' onClick={() => this.handleClick(x)}>{x.a}</a></li>
          })
        }
        </ul>
        <button>Submit</button>
      </div>
    )
  }
}
