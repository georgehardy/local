import React from 'react'
import {Map, TileLayer, Marker, Popup} from 'react-leaflet'

export default function RegistrationMap (props) {
  const position = [props.coords.lat, props.coords.lng]
  return (
    <div id='regmap'>
      <Map center={position} zoom={18}>
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          {<Popup>
              Placeholder text
          </Popup>}
        </Marker>
      </Map>
    </div>
  )
}
