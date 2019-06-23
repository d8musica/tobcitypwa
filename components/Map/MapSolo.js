import React, { PureComponent, Fragment } from 'react'
import { Map, Polyline, Marker, GoogleApiWrapper } from 'google-maps-react'
import { connect } from 'react-redux'

class Contents extends PureComponent {
  render() {
    const { latFrom, latTo, lngFrom, lngTo, polyline } =  this.props.props
    const from = { lat: latFrom, lng: lngFrom }
    const to = { lat: latTo, lng: lngTo }
    const overviewPolyline = polyline
    const pointsline = overviewPolyline && this.props.google.maps.geometry.encoding.decodePath(overviewPolyline)
    const pointstobound = [
      { lat: latFrom, lng: lngFrom },
      { lat: latTo, lng: lngTo }
    ]
    const bounds = new this.props.google.maps.LatLngBounds()
    for (let i = 0; i < pointstobound.length; i++) {
      bounds.extend(pointstobound[i])
    }
    return (
      <Fragment>
        <div>
          <Map
            {...this.props}
            bounds={bounds}
            zoom={12}
          >
            {
              (overviewPolyline) &&
                <Polyline
                  path={pointsline}
                  strokeColor="#1e8c86"
                  strokeOpacity={0.8}
                  strokeWeight={2}
                />
            }
            <Marker
              position={from}
            />
            <Marker
              position={to}
            />
          </Map>
        </div>
      </Fragment>
    );
  }
}

const MapWrapper = props => (
  <Map google={props.google} visible={false}>
    <Contents {...props} />
  </Map>
)

export default connect()(GoogleApiWrapper({
  apiKey: process.env.GOOGLE_MAPS,
  language: 'es',
  region: 'co',
  libraries: ['geometry', 'places']
})(MapWrapper))
