import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import request from 'superagent'

export default class MapTest extends Component {
  render() {
    const position = [this.props.coords.lat, this.props.coords.lng]
    return (
      <div>
      <Map center={position} zoom={18}>
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          {/* <Popup>
            Text
          </Popup> */}
        </Marker>
      </Map>
      </div>
    )
  }
}