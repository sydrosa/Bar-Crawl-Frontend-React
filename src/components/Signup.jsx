import React, { Component } from 'react';
import Login from './Login';
import Step1 from '../containers/Step1'
import Step2 from '../containers/Step2'

export default class Signup extends Component {
    constructor(props) {
        super(props)

        this._next = this._next.bind(this);
        this._prev = this._prev.bind(this);

        this.state={
            currentStep: 1,
            first_name: '',
            email: '', 
            password: '',
            password_confirmation: '',
            zipcode: '',
            birthdate: '',
            confirmation: false,
            user: null
        }
    }

    handleCheckBox = (event) => {
        event.preventDefault();
        this.setState({ confirmation: true })
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
            <button
              className="button"
              style={{ width: "56%", marginLeft: "auto", marginRight: "auto" }}
              type="button"
              onClick={this._next}
            >
              Next
            </button>
          );
        }
        return null;
      }
    
      get submitButton() {
        if (this.state.currentStep === 2) {
          return (
            <input
              type="submit"
              value="Create Account"
              className="button"
              style={{ width: "56%", marginLeft: "auto", marginRight: "auto" }}
            />
          );
        }
        return null;
      }

      handleChange = event => {
            event.persist();
            this.setState({
          [event.target.name]: event.target.value
        });
      };

      handleSubmit = event => {
        if (this.state.password === this.state.password_confirmation) {
          event.preventDefault();
          fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body: JSON.stringify({
              user: {
                first_name: this.state.first_name,
                email: this.state.email,
                password: this.state.password,
                zipcode: this.state.zipcode,
                birthdate: this.state.birthdate,
              }
            })
          })
            .then(resp => resp.json())
            .then(response => {
              console.log(response)
              localStorage.setItem("jwt", response.jwt);
              localStorage.setItem("user id", response.user.id)
              this.setState({ user: response.user });
            //   this.createCuisinePreferences(this.state.user)
            //   this.getRecentUserInfo() 
            })
        } else alert("Passwords don't match - try again!");
      };
    

    render() {
        console.log(this.state)
        return (
            <div className="d-md-flex h-md-100 align-items-center">
                <div className="col-md-6 p-0 bg-indigo h-md-100">
                    <div className="text-white d-md-flex align-items-center h-100 p-5 text-center justify-content-center">
                        <div className="logoarea pt-5 pb-5">
                        <video playsInline="playsinline" autoPlay="autoplay" muted="muted" loop="loop" style={{position: 'fixed', top: '-200px', left: '-200px', height: '125%' }}>
                            <source src="https://player.vimeo.com/external/327335901.hd.mp4?s=db78b3776e88c0982877eada43b03001c0896b61&profile_id=175&oauth2_token_id=57447761" type="video/mp4" />
                        </video>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 p-0 bg-white h-md-100 loginarea">
                    <div className="d-md-flex align-items-center h-md-100 p-5 justify-content-center">
                        <Login />
                        <form onSubmit={this.handleSubmit}>
                            <Step1
                            currentStep={this.state.currentStep}
                            handleChange={this.handleChange}
                            name={this.state.name}
                            email={this.state.email}
                            password={this.state.password}
                            password_confirmation={this.state.password_confirmation}
                            />
                            <Step2
                            currentStep={this.state.currentStep}
                            handleChange={this.handleChange}
                            handleCheckBox={this.handleCheckBox}
                            />
                            <div
                            style={{
                                marginLeft: "30%",
                                marginRight: "auto",
                                padding: "15px"
                            }}
                            >
                            {this.nextButton}
                            {this.submitButton}
                            {this.previousButton}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}