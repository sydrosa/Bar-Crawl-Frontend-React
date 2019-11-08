import React, { Component } from 'react';

const URL = 'http://localhost:3000/users'

export default class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            user: null
        }
    }

    handleChange = (event) => {
        event.persist();
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleLogin = (event) => {
        event.preventDefault()
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json' 
            },
            body: JSON.stringify({
                "user": {
                    "email": this.state.email,
                    "password": this.state.password
                  }
            })
        })
        .then(resp => resp.json())
        .then(resp => {
                window.localStorage.setItem("token", resp.jwt)
                window.localStorage.setItem("id", resp.user.id)
                this.setState ({ user: resp.user })
                console.log(resp)
        })
        .catch(error => console.log(error));
        this.setState({
            email: "",
            password: ""
        })
    }

    render() {
        return(
            <div>
                <form className="LoginForm" onSubmit={(event) => this.handleLogin(event)}>
                    <p>
                        <label htmlFor="title">email: </label>
                        <input type="text" name="email" onChange={this.handleChange} />
                    </p>
                    <p>
                        <label htmlFor="content">password: </label>
                        <input type="password" name="password" id="" cols="30" rows="10" onChange={this.handleChange}></input>
                    </p>
                    <input type="submit" value="Login" />
                </form>
            </div>
        )
    }
}