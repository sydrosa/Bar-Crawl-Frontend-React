import React, { Component } from 'react';
import CrawlStep1 from '../containers/CrawlStep1'
import CrawlStep2 from '../containers/CrawlStep2'
import { Button, Checkbox, Form } from 'semantic-ui-react';

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
const URL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=30.266666,-97.733330&radius=1500&type=bar&key=${apiKey}`
const users = `https://localhost:3000/users`

export default class NewCrawl extends Component {
    constructor(){
        super()

        this._next = this._next.bind(this);
        this._prev = this._prev.bind(this);

        this.state = {
            currentStep: 1,
            location_1: '',
            location_2: '',
            location_3: '',
            currentUser: parseInt(window.localStorage.getItem('id')),
            time: null,
            date: null,
            locations: [],
            crawlers: []
        }
    }

    handleCrawlFriends = (arr) => {
      arr.push()
      this.setState ({ crawlers: arr })
    }

    componentDidMount() {
      fetch(URL)
      .then (resp => resp.json())
      .then (bars => {
        const locationNames = bars.results.map(bar => {
          return bar.name
        })
        this.setState ({ locations: locationNames })
      })
    }

    // componentDidUpdate() {
    //   console.log(this.state.crawlers)
    // }

    handleFeelingLucky = (locations) => {
      this.setState ({
        location_1: locations[Math.floor (Math.random() * locations.length)],
        location_2: locations[Math.floor (Math.random() * locations.length)],
        location_3: locations[Math.floor (Math.random() * locations.length)]
      })
    }

    _next() {
        let thisStep = this.state.currentStep;
        thisStep = thisStep >= 1 ? 2 : thisStep + 1;
        this.setState({
          currentStep: thisStep
        });
      }
    
      _prev() {
        let thisStep = this.state.currentStep;
        thisStep = thisStep <= 1 ? 1 : thisStep - 1;
        this.setState({
          currentStep: thisStep
        });
      }
    
      get previousButton() {
        let currentStep = this.state.currentStep;
        if (currentStep !== 1) {
          return (
            <small
              style={{ color: "#5C5932" }}
              onClick={this._prev}
              className="link"
            >
              <b>Go back.</b>
            </small>
          );
        }
        return null;
      }
    
      get nextButton() {
        let currentStep = this.state.currentStep;
        if (currentStep === 1) {
          return (
            <React.Fragment>
              {/* <Button onClick={this.handleFeelingLucky}>Feeling Lucky!</Button> */}
              <Button type='submit' onClick={this._next}>Next</Button>
            </React.Fragment>
          );
        }
        return null;
      }
    
      get submitButton() {
        if (this.state.currentStep === 2) {
          return (
            <Button type='submit' onClick={this.handleSubmit}>Submit</Button>
          );
        }
        return null;
      }

      handleLocation1 = (event, { value }) => {
        this.setState({
          location_1: value
        })
      }

      handleLocation2 = (event, { value }) => {
        this.setState({
          location_2: value
        })
      }

      handleLocation3 = (event, { value }) => {
        this.setState({
          location_3: value
        })
      }

      handleChange = event => {
            this.setState({
            [event.target.name]: event.target.value
        });
      };

      handleSubmit = event => {
          event.preventDefault();
          fetch("http://localhost:3000/crawls", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body: JSON.stringify({
                user_id: window.localStorage.getItem('id'),
                location_1: this.state.location_1,
                location_2: this.state.location_2,
                location_3: this.state.location_3,
                start_time: this.state.time,
                start_date: this.state.date
            })
          })
            .then(resp => resp.json())
            .then(response => {
              console.log('Your crawl has been created!', response)
              fetch("http://localhost:3000/crawlers", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Accept: "application/json"
                    },
                    body: JSON.stringify({
                      crawl_id: response.id,
                      user_id: window.localStorage.getItem('id')
                    })
                  })
                    .then(resp => resp.json())
                    .then(resp => {
                      console.log("Curent user has been added to crawl!", resp)
                    })
              this.state.crawlers.map(crawler => {
                fetch("http://localhost:3000/crawlers", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json"
                },
                body: JSON.stringify({
                  crawl_id: response.id,
                  user_id: crawler.id
                })
              })
              .then(resp => resp.json())
              .then(response => {
                console.log('Your crawlers have been saved!', response)
                  })
                })
              })
      };
    
    render() {
      console.log(this.state)
        return(
            <React.Fragment>
              <div className="d-md-flex align-items-center h-md-100 p-5 justify-content-center">
                  <Form onSubmit={this.handleSubmit}>
                      <CrawlStep1
                      currentStep={this.state.currentStep}
                      handleLocation1={this.handleLocation1}
                      handleLocation2={this.handleLocation2}
                      handleLocation3={this.handleLocation3}
                      locations={this.state.locations}
                      location_1={this.state.location_1}
                      location_2={this.state.location_2}
                      location_3={this.state.location_3}
                      />
                      <CrawlStep2
                      currentStep={this.state.currentStep}
                      handleChange={this.handleChange}
                      handleCheckBox={this.handleCheckBox}
                      handleCrawlFriends={this.handleCrawlFriends}
                      />
                      <div
                      style={{
                          marginLeft: "10%",
                      }}
                      >
                      {this.nextButton}
                      {this.submitButton}
                      {this.previousButton}
                      </div>
                  </Form>
              </div>
            </React.Fragment>
        )
    }
}