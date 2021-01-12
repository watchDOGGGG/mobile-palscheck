import React from 'react'
import NewsFeed from '../Newsfeed/Newsfeed/newsfeed'
import Sugesstion from '../Dashboard/Suggestions/suggestions'
const localLink = 'localhost:4000'
const SeverLink = 'https://still-cover-backend.uc.r.appspot.com'
class Home extends React.Component{
    constructor(){
        super()

        this.state = {
            following:[]
        }
    }
componentDidMount(){
    this.getAllFollowing()
}
    getAllFollowing = async()=>{
        const fetchAll = await fetch(`${SeverLink}/Authentication/getAllFollowing/${this.props.userid}`)
        const response = await fetchAll.json()
        if(response.following){
            this.setState({following:response.following})
        }
       
    }
    
    render(){
        const {userid} = this.props
        const {following} = this.state
        return(
            <div className="justify-center">
                {/* Newsfeed */}
                <div className="feedlayout">
                    <Sugesstion following={following} loggedIn={userid}/>
                    <NewsFeed following={following} loggedIn={userid}/>
                </div> 
                
            </div>
        )
    }
}
export default Home