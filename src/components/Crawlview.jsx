import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import MapContainer from '../containers/MapContainer'
import CrawlContainer from '../containers/CrawlContainer'
import history from '../history'
import { Button, Icon, Image, Item, Label } from 'semantic-ui-react'

const proxyURL = 'https://cors-anywhere.herokuapp.com/'
const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

export default class Crawlview extends Component {
    constructor(props) {
        super(props)

        this.state={
            bar: '',
            latData: '',
            lngData: '',
            id: '',
            user_id: this.props.crawl.user_id,
            user: '',
            crawl: this.props.crawl
        }
    }


    componentDidMount() {
        fetch(`http://localhost:3000/users/${this.state.user_id}`)
        .then (resp => resp.json())
        .then (resp => {
            this.setState({ 
                user: resp,
                bar: this.props.crawl.location_1.toLowerCase().replace(/[^a-zA-Z ]/g, '%20')
            }, () => {
                this.fetchBars()
            })
        })
        
    }


    fetchBars = () => {
        //insert `${proxyURL} in front of fetch link in case it's not working.
        fetch(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${this.state.bar}&inputtype=textquery&fields=name,photos,formatted_address,opening_hours,rating,geometry&locationbias=circle:10000@30.2672,97.7431&key=${apiKey}`)
        .then(resp => resp.json())
        .then(bar =>
            this.setState({ 
                bar: bar.candidates[0],
                latData: bar.candidates[0].geometry.location.lat,
                lngData:  bar.candidates[0].geometry.location.lng,
                id: this.props.crawl.id  
            })
        )
    }

    handleClick = (event) => {
        event.preventDefault();
        history.push(`/crawls/${this.state.crawl.id}`)
    }

    render() {
        return(
    <Router>
        <Item.Group divided style={{ padding: '5%' }}>
        <Item style={{ padding: '100px' }}>
            <Item.Image src='https://cdn.fstoppers.com/styles/large-16-9/s3/lead/2014/12/fstoppers-dylan-patrick-setting-up-a-successful-headshot-session-8.jpg' style={{ width: '200px', height: '200px' }}/>            
            <Item.Content>
              <Item.Header as='a'><h4><b>Starting Location:</b> {this.state.bar.name}</h4></Item.Header>
                <Item.Meta>
                    <span className='cinema'><b>Hosted by: </b>{this.state.user.first_name}</span>
                </Item.Meta>
              <Item.Description>
                  <p>Starting Address: {this.state.bar.formatted_address}</p>
                  <p>Currently <b>{this.props.crawl.crawlers.length}</b> crawlers attending.</p></Item.Description>
                <Item.Extra>
                        <Link to={`/crawls/${this.state.crawl.id}`}>Click here to see more info.</Link>
                </Item.Extra>
            </Item.Content>
          </Item>
          </Item.Group>
        <Route exact path={`/crawls/${this.state.crawl.id}`}
            render={(...props) => 
                <CrawlContainer id={this.state.id} bar={this.state.bar} lngData={this.state.lngData} latData={this.state.latData}/>}>
        </Route>
    </Router>
   
        )
    }
}