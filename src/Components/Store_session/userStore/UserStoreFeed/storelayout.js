import React from 'react'
import PageFeed from '../../../Newsfeed/PageFeed/newsfeed.jsx'
import About from '../Profile/about.jsx'
import FollowersApi from '../Profile/FollowersApi'
const localLink = 'http://localhost:4000'
const SeverLink = 'https://still-cover-backend.uc.r.appspot.com'
class StoreLayout extends React.Component{
    constructor(){
        super()
        this.state = {
            isLoggedIn:[]
        }
    }
    componentDidMount(){
        try {
            this.getLoggedInUser()
        } catch (error) {
            
        }
    }
//getLoggedInuser
getLoggedInUser = async()=>{
    const getLogginUser = await fetch(`${SeverLink}/Authentication/User/LoggedIn`,{
        headers:{token:localStorage.token}
    })
    const response = await getLogginUser.json()
    this.setState({isLoggedIn:response.loggedIn})
}
    render(){
        
        return(
            <div className="justify-center">
            {/* profileNewsfeed */}
                <div className="">
                    <PageFeed
                        pagename={this.props.pagename}
                        id={this.props.id}
                        loggedIn={this.state.isLoggedIn}
                    />
                </div>
                {/* <div className='center w-30'>
                    <About 
                        pagename={this.props.pagename}
                        id={this.props.id}
                        loggedIn={this.state.isLoggedIn}
                        ProfileImage={this.props.ProfileImage}
                        about={this.props.about}
                        address={this.props.address}
                        websites={this.props.websites}
                        phone={this.props.phone}
                        country={this.props.country}
                        region={this.props.region}
                        />
                        
                    <FollowersApi pageId={this.props.id} />
                </div> */}
            </div>
        )
    }
}
export default StoreLayout