import React from 'react';

const Step2 = (props) => {
    if (props.currentStep === 1) {
        return null;
      }
      return (
        <React.Fragment>
        <div className="form-group" style={{padding: '60px'}}>
        <h3>Take the guesswork out of where you and your pals are drinking tonight.</h3>
        <label>zipcode:</label>
        <input 
            className="form-control"
            id="zipcode"
            name="zipcode"
            type="text"
            value={props.name}
            onChange={props.handleChange} 
            />
          <label>email:</label>
          <br />
          <small><i>you must be 21 or older to enjoy our site.</i></small>
          <input
            className="form-control"
            id="birthdate"
            name="birthdate"
            type="date"
            value={props.name}
            onChange={props.handleChange} 
          />
          <label>please confirm that you are over the age of 21:</label>
          <input
            className="form-control"
            id="confirmation"
            name="confirmation"
            type="checkbox"
            required
          />
          <label>upload a profile picture:</label>
          <input
            className="form-control"
            id="file_upload"
            name="file_upload"
            type="file"
          />
          </div>
        </React.Fragment>
      )
}

export default Step2;