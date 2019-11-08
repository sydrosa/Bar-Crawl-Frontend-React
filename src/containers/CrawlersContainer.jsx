import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'

const CrawlersContainer = (props) => {
    return(
            <Card style={{ padding: '25px' }}>
                <Image src='https://imgix.bustle.com/uploads/image/2018/5/9/fa2d3d8d-9b6c-4df4-af95-f4fa760e3c5c-2t4a9501.JPG?w=970&h=546&fit=crop&crop=faces&auto=format&q=70' wrapped ui={false}/>
                    <Card.Content>
                    <Card.Header>{props.crawler.user.first_name}</Card.Header>
                    <Card.Meta>
                        <span className='date'>Austin, TX</span>
                    </Card.Meta>
                    <Card.Description>
                        {/* this is not working -- need to refactor */}
                        {props.limitBio(props.crawler.user.bio)}...
                    </Card.Description>
                    </Card.Content>
            </Card>
    )
}

export default CrawlersContainer;