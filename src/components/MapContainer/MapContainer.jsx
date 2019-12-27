import React from "react";
import { GoogleApiWrapper, Map, Marker } from "google-maps-react";

export class MapContainer extends React.Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={10}
        initialCenter={this.props.initialCenter}
        fullscreenControl={false}
      >
        {this.props.events &&
          this.props.events.map((marker, index) => {
            return (
              <Marker
                key={index}
                title={marker.name}
                name={marker.name}
                position={{ lat: marker.lat, lng: marker.lng }}
              />
            );
          })}
      </Map>
    );
  }
}

const LoadingContainer = () => <div>Fancy loading container!</div>;

export default GoogleApiWrapper(props => ({
  apiKey: "AIzaSyBQ9-ISGtpJ1T75Jps3b8jdQJPai3bWJI4",
  language: props.language,
  LoadingContainer: LoadingContainer
}))(MapContainer);
