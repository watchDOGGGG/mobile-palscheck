import React from 'react'
import PageFeed from '../../../Newsfeed/PageFeed/newsfeed.jsx'
class StoreLayout extends React.Component{
    constructor(){
        super()
        this.state = {
            
        }
    }

    render(){
        return(
            <div className="flex justify-center">
            {/* profileNewsfeed */}
                <div className="w-60 center pa2">
                    <PageFeed
                        pagename={this.props.pagename}
                        id={this.props.id}
                    />
                </div> 
            </div>
        )
    }
}
export default StoreLayout