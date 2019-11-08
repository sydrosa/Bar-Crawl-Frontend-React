import React from 'react';

const Step1 = (props) => {
    if (props.currentStep !== 1) {
        return null
    }
    return(
        <React.Fragment>
        <div className="form-group" style={{padding: '60px'}}>
        <h3>Take the guesswork out of where you and your pals are drinking tonight.</h3>
        <label>first name:</label>
        <input 
            className="form-control"
            id="first_name"
            name="first_name"
            type="text"
            value={props.name}
            onChange={props.handleChange} 
            />
          <label>email:</label>
          <br />
          <small><i>don't worry -- we'll never share your info.</i></small>
          <input
            className="form-control"
            id="email"
            name="email"
            type="text"
            value={props.email} 
            onChange={props.handleChange} 
          />
          <label>password:</label>
          <input
            className="form-control"
            id="password"
            name="password"
            type="password"
            value={props.password} 
            onChange={props.handleChange}
          />
          <label>password confirmation:</label>
          <input
            className="form-control"
            id="password_confirmation"
            name="password_confirmation"
            type="password"
            value={props.password_confirmation} 
            onChange={props.handleChange}
          />
          </div>
        </React.Fragment>
    )
}

export default Step1;