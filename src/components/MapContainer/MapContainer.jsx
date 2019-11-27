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

const LoadingContainer = () => (
    <div>Fancy loading container!</div>
);

export default GoogleApiWrapper(
(props) => ({
    apiKey: 'AIzaSyAetgoHqsaLrYb2MXog6fjcBndYw0vMbgc',
    language: props.language,
    LoadingContainer: LoadingContainer
}))(MapContainer)

