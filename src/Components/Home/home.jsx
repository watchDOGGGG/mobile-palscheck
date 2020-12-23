import React from 'react'
import NewsFeed from '../Newsfeed/Newsfeed/newsfeed'

class Home extends React.Component{
    constructor(){
        super()

        this.state = {

        }
    }

    render(){
        return(
            <div className="flex justify-center">
                {/* profileNewsfeed */}
                <div className="feedlayout">
                    <NewsFeed/>
                </div> 
                
            </div>
        )
    }
}
export default Home