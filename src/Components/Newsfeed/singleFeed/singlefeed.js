import React from 'react'
import SingleFeedTemp from './singleFeedTemp'
class SingleFeed extends React.Component{

    render(){
        return(

            <article className="newfeed--3-art ">
                <SingleFeedTemp
                address={this.props.match.params.id}
                />
            </article> 
        )
    }
}
export default SingleFeed