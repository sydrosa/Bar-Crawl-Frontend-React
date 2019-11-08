import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;


class MapContainer extends Component {
    constructor(props) {
        super(props)

        this.state ={
            latData: '',
            longData: ''
        }
    }

    componentDidMount() {
        this.setState({ 
                latData : this.props.latData,
                longData: this.props.lngData
            })
    }

    render() {
        return (
            <>
            <Map
            style={{ width: '200px', height: '200px', position: 'relative' }}
            google={this.props.google}
            zoom={14}
            center={{ 
                lat: parseFloat(this.props.latData), 
                lng: parseFloat(this.props.lngData) }} >
                <Marker position={{ 
                    lat: parseFloat(this.props.latData), 
                    lng: parseFloat(this.props.lngData) }} />
            </Map>
            </>
        )
    }
};

export default GoogleApiWrapper({
    apiKey: apiKey
  })(MapContainer);