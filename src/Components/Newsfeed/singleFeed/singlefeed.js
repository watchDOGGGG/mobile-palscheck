import React from 'react'
import SingleFeedTemp from './singleFeedTemp'
class SingleFeed extends React.Component{

    render(){
        return(
            <div className="flex justify-center">

            {/* profileNewsfeed */}
            <article className="newfeed--3-art br4 pa3 pa4-ns ba b--black-10 w-60">
                <SingleFeedTemp
                address={this.props.match.params.id}
                />
            </article> 
        </div>
        )
    }
}
export default SingleFeed