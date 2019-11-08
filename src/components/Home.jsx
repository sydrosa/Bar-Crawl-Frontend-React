import React, { Component } from 'react';
import CrawlView from './Crawlview'
import { thisExpression } from '@babel/types';
import {BrowserRouter as Router, Route, Switch, useRouteMatch } from 'react-router-dom';
import NewCrawl from './NewCrawl'

const URL = "http://localhost:3000/crawls"

export default class Home extends Component {
    constructor() {
        super()

        this.state={
            crawls: [],
            firstBar: ''
        }
    }

    componentDidMount() {
        fetch(URL)
        .then(resp => resp.json())
        .then(crawls => {
            this.setState ({ 
                crawls: crawls, 
            })
        })
    }


    render() {

        return(
            <React.Fragment>
                <Switch>
                    <Route path='/crawls/new'>
                        <NewCrawl />
                    </Route>
                </Switch>
                <div className="jumbotron jumbotron-fluid">
                        <div className="container">
                            <h1 className="h1" style={{ textAlign: "center" }}>crawls happening near you;</h1>
                        </div>
                    </div>
                    <div className="container">
                            {this.state.crawls.map((crawl, index) => {
                                return <CrawlView crawl={crawl} key={index} />
                            })}
                        </div>
            </React.Fragment>
            
            
        )
    }
}