import React from 'react';
import SearchFriends from '../components/SearchFriends'
import { Button, Checkbox, Form } from 'semantic-ui-react';

const CrawlStep2 = (props) => {
    if (props.currentStep === 1) {
        return null;
      }
      return (
        <Form style={{padding: '60px'}}>
        <h3>Let's party tonight.</h3>
        <label>Date:</label>
        <Form.Input 
            id="date"
            name="date"
            type="date"
            value={props.name}
            onChange={props.handleChange} 
            />
          <label>Start Time:</label>
          <Form.Input 
            id="time"
            name="time"
            type="time"
            value={props.name}
            onChange={props.handleChange} 
            />
          <br />
          <label>Search Friends:</label>
          <small>You can only select up to 8.</small>
            <SearchFriends handleCrawlFriends={props.handleCrawlFriends}/>
          </Form>
      )
}

export default CrawlStep2;