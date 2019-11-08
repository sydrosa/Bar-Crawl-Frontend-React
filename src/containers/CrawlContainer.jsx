import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import CrawlersContainer from './CrawlersContainer'
import { Card, Icon, Image } from 'semantic-ui-react'

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

 class CrawlContainer extends Component {
    constructor(props) {
        super(props)

        this.state= {
            latData: '',
            lngData: '',
            currentCrawlers: [],
            location_1: {
                name: '',
                latData: '',
                lngData: ''
            },
            location_2: {
                name: '',
                latData: '',
                lngData: ''
            },
            location_3: {
                name: '',
                latData: '',
                lngData: ''
            },
            host: ''
        }
    }

    componentDidMount() {
        this.setState({ 
            latData: this.props.latData,
            longData: this.props.lngData
        })
        fetch(`http://localhost:3000/crawls/${this.props.id}`)
        .then (resp => resp.json())
        .then (resp => {
            console.log(resp)
            this.setState ({ 
                host: resp.crawlers[0].user.first_name,
                currentCrawlers: resp.crawlers,
                location_1: { ...this.state.location_1, name: resp.location_1.toLowerCase().replace(/[^A-Z0-9]+/ig, '%20')}, 
                location_2: { ...this.state.location_2, name: resp.location_2.toLowerCase().replace(/[^A-Z0-9]+/ig, '%20')},
                location_3: { ...this.state.location_3, name: resp.location_3.toLowerCase().replace(/[^A-Z0-9]+/ig, '%20')}
            })  
        })
        .then (this.findCoordinates)
    }

    limitBio = (bioString) => {
        bioString.substr(0, 25)
    }

    // findCoordinates = () => {
    //     fetch(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${this.state.location_1.name}&inputtype=textquery&fields=name,photos,formatted_address,opening_hours,rating,geometry&locationbias=circle:10000@30.2672,97.7431&key=${apiKey}`)
    //     .then(resp => resp.json())
    //     .then(resp => {
    //         this.setState ({
    //             location_1: { ...this.state.location_1, latData: resp.candidates[0].geometry.location.lat, lngData: resp.candidates[0].geometry.location.lng}
    //         })
    //     })
    //     fetch(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${this.state.location_2.name}&inputtype=textquery&fields=name,photos,formatted_address,opening_hours,rating,geometry&locationbias=circle:10000@30.2672,97.7431&key=${apiKey}`)
    //     .then(resp => resp.json())
    //     .then(resp => {
    //         this.setState ({
    //             location_2: { ...this.state.location_2, latData: resp.candidates[0].geometry.location.lat, lngData: resp.candidates[0].geometry.location.lng}
    //         })
    //     })
    //     fetch(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${this.state.location_3.name}&inputtype=textquery&fields=name,photos,formatted_address,opening_hours,rating,geometry&locationbias=circle:10000@30.2672,97.7431&key=${apiKey}`)
    //     .then(resp => resp.json())
    //     .then(resp => {
    //         this.setState ({
    //             location_3: { ...this.state.location_3, latData: resp.candidates[0].geometry.location.lat, lngData: resp.candidates[0].geometry.location.lng}
    //         })
    //     })
    // }

    render() {
        console.log(this.state.host)
        return(
            <div>
                <h3>Currently attending:</h3>
                        <br />
                <Card.Group itemsPerRow={4}>
                        {this.state.currentCrawlers.map((crawler, index) => {
                            return <CrawlersContainer crawler={crawler} key={index} limitBio={this.limitBio}/>
                        })}
                        <Card style={{ padding: '25px' }}>
                            <Image src='https://www.iconsdb.com/icons/preview/gray/plus-6-xxl.png' style={{ width: '100px'}} />
                                <Card.Content>
                                <Card.Header>Your Name Here</Card.Header>
                                <Card.Meta>
                                    <span className='date'>Are you in?</span>
                                </Card.Meta>
                                    <Card.Description>
                                        Click here to add join this bar crawl!
                                    </Card.Description>
                                </Card.Content>
                        </Card>
                </Card.Group>

                        <Map
                            style={{ width: '50%', height: '50%', position: 'relative' }}
                            google={this.props.google}
                            zoom={14}>
                            <Marker
                                title={'The marker`s title will appear as a tooltip.'}
                                name={this.state.location_1.name}
                                position={{lat: this.state.location_1.latData, lng: this.state.location_1.lngData}} />
                            <Marker
                                name={this.state.location_1.name}
                                position={{lat: this.state.location_1.latData, lng: this.state.location_1.lngData}} />
                            <Marker />
                            <Marker
                                name={this.state.location_1.name}
                                position={{lat: this.state.location_1.latData, lng: this.state.location_1.lngData}} />
                            </Map>
                </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: apiKey
  })(CrawlContainer);