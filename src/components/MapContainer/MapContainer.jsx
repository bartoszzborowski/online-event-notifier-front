import React from 'react';
import {GoogleApiWrapper, Map} from 'google-maps-react';

export class MapContainer extends React.Component {
    render() {
        return (
            <Map google={this.props.google}
                 zoom={15}
                 initialCenter={{
                    lat: 52.227889,
                    lng: 21.001778
                }}
            fullscreenControl={false}>

            </Map>
        );
    }
}

const LoadingContainer = (props) => (
    <div>Fancy loading container!</div>
);

export default GoogleApiWrapper(
(props) => ({
    apiKey: 'AIzaSyB7tK3roZFjTqtvhScvg136TcJx38qtbDY',
    language: props.language,
    LoadingContainer: LoadingContainer
}))(MapContainer)

