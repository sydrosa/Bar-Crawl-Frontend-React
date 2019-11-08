import React, { Component } from 'react';
import { Menu, Message } from 'semantic-ui-react'

export default class Nav extends Component {
    constructor(){
        super()

        this.state={
            activeItem: 'Explore'
        }
    }

    handleItemClick = (event, {name}) => {
        this.setState({ activeItem: name})
    }


    render() {
        const { activeItem } = this.state
        
            return(
            <React.Fragment>
                <Menu pointing>
                    <Menu.Item
                        position='right'
                        name='Create'
                        active={activeItem === 'Create'}
                        onClick={this.handleItemClick}
                        href="/crawls/new"
                    />
                    <Menu.Item
                        position='right'
                        name='Explore'
                        active={activeItem === 'Explore'}
                        onClick={this.handleItemClick}
                        href="/crawls"
                    />
                    <Menu.Item
                        position='right'
                        name='Settings'
                        active={activeItem === 'Settings'}
                        onClick={this.handleItemClick}
                        href="/settings"
                    />
                </Menu>
            </React.Fragment>
            )
        }
}
