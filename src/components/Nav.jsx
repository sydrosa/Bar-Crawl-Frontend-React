import React, { Component, NavLink, Navbar  } from 'react';

export default class Nav extends Component {
    render() {
        return(
        <React.Fragment>
                <nav className="navbar mb-3">
                    <ul className="list-unstyled nav nav-pills justify-content-end">
                    <a className="navbar-brand" href="/crawls/new">
                        <li className="nav-item"
                        tabIndex="-3">
                            Create <span className="badge badge-secondary">{this.props.totalItems}</span></li>
                    </a>
                    <a className="navbar-brand" href="/crawls">
                        <li className="nav-item"
                        tabIndex="-2">
                        Explore <span className="badge badge-secondary">{this.props.totalItems}</span></li>
                    </a>
                    <a className="navbar-brand" href="/">
                        <li className="nav-item"
                        tabIndex="-1">
                            Settings <span className="badge badge-secondary">{this.props.totalItems}</span></li>
                    </a>
                    </ul>
                </nav>
        </React.Fragment>
        )
    }
}
