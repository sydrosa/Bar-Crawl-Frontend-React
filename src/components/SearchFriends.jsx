import React, { Component } from 'react';
import { Search, Grid, Card, Feed } from 'semantic-ui-react'
import _ from 'lodash'

const initialState = { isLoading: false, results: [], value: '', users: [], selectedUsers: [] }

export default class SearchFriends extends Component {
    state = initialState

    // handleResultSelect = (e, { result }) => const newUsers = this.state.selectedUsers.push(result)

    handleResultSelect = (e, {result} ) => {
        e.preventDefault();
        let newUsers = [...this.state.selectedUsers]
        newUsers.push(result)
        this.setState ({ selectedUsers: newUsers })
        this.props.handleCrawlFriends(this.state.selectedUsers)
    }
  
    handleSearchChange = (e, { value }) => {
      this.setState({ isLoading: true, value })
  
      setTimeout(() => {
        if (this.state.value.length < 1) return this.setState(initialState)
  
        const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
        const isMatch = (result) => re.test(result.first_name)
  
        this.setState({
          isLoading: false,
          results: _.filter(this.state.users, isMatch),
        })
      }, 300)
    }

    componentDidMount() {
        fetch('http://localhost:3000/users')
        .then (resp => resp.json())
        .then (users => {
            this.setState ({ users: users })
        })
    }


    render() {
        const { isLoading, value, results } = this.state
            return(
                <>
                    <Grid>
                        <Grid.Column width={6}>
                        <Search
                            fluid
                            loading={isLoading}
                            onResultSelect={this.handleResultSelect}
                            onSearchChange={_.debounce(this.handleSearchChange, 500, {
                            leading: true,
                            })}
                            results={results}
                            value={value}
                            {...this.props}
                        />
                        </Grid.Column>
                        <Grid.Column width={10}>
                        <Card>
                            <Card.Content>
                            <Card.Header>Recent Activity</Card.Header>
                            </Card.Content>
                            <Card.Content>
                            <Feed>
                                {this.state.selectedUsers.map((user,index) => {
                                    return <Feed.Event>
                                            <Feed.Label image='/images/avatar/small/jenny.jpg' />
                                            <Feed.Content>
                                                <Feed.Date content='Today' />
                                                <Feed.Summary>
                                                You added {user.first_name} to your <i>bar crawl</i>.
                                                </Feed.Summary>
                                            </Feed.Content>
                                            </Feed.Event>
                                })}
                            </Feed>
                            </Card.Content>
                        </Card>
                        </Grid.Column>
                    </Grid>
                </>
            )
    }
}