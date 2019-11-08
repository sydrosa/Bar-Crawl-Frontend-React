import React from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react';

const CrawlStep1 = (props) => {

    const options = props.locations.map((bar, index) => {
        return {
            key: index,
            text: bar,
            value: `${bar}`
        }
    })

    if (props.currentStep !== 1) {
        return null
    }
    return(
            <Form style={{padding: '60px'}}>
                <h3>Let's party tonight.</h3>
                <small>Pick a few locations to start or click "feeling lucky" below to randomize your crawl locations!</small>
                <br />
                <Form.Field>
                <label>Location 1:</label>
                    <Form.Select
                        placeholder="Location 1"
                        id="location_1"
                        name="location_1"
                        options={options}
                        onChange={props.handleLocation1} 
                    />
                </Form.Field>
                <Form.Field>
                <label>Location 2:</label>
                    <Form.Select
                        placeholder="Location 2"
                        id="location_2"
                        name="location_2"
                        options={options}
                        onChange={props.handleLocation2} 
                        error
                    />
                </Form.Field>
                <Form.Field>
                <label>Location 3:</label>
                    <Form.Select
                        placeholder="Location 3"
                        id="location_3"
                        name="location_3"
                        options={options}
                        onChange={props.handleLocation3} 
                        error
                    />
                </Form.Field>
            </Form>
    )
}

export default CrawlStep1;