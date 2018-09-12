import React from 'react'
import {Map, TileLayer, Marker, Popup} from 'react-leaflet'

export default function MainMap (props) {

  return (
    <div id='mainmap'>
      <Map center={['-36.86495', '174.77592']} zoom={18}>
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={['-36.86495', '174.77592']}>
          {<Popup>Placeholder text</Popup>}
        </Marker>
        <Marker position={['-36.86361', '174.7704']}>
          {<Popup>Placeholder text</Popup>}
        </Marker>
        <Marker position={['-36.91133', '174.82995']}>
          {<Popup>Placeholder text</Popup>}
        </Marker>
        <Marker position={['-36.8654', '174.77668']}>
          {<Popup>PitaPit</Popup>}
        </Marker>
        <Marker position={['-36.86516', '174.7769']}>
          {<Popup>Mojo</Popup>}
        </Marker>
      </Map>
    </div>
  )
}
