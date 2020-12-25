import React from 'react'
import SingleFeedTemp from './singleFeedTemp'
class SingleFeed extends React.Component{

    render(){
        return(
            <div className="justify-center">

            {/* profileNewsfeed */}
            <article className="newfeed--3-art center  b--black-10">
                <SingleFeedTemp
                address={this.props.match.params.id}
                />
            </article> 
        </div>
        )
    }
}
export default SingleFeed