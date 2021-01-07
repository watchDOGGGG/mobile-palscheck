import React from 'react'
import ProfileImage from './profileImage/profileImage'
import ProfileCard from './profilecard/profileCard.jsx'
import ProfileNewsFeed from '../Newsfeed/profileNewsfeed/newsfeed.jsx'
import './profile.css'
import NotFound from '../404/404'
import ProfileEdit from './EditProfile/edit.jsx'
import Followbtn from '../Follow/followbtn.jsx'

const localLink = 'http://localhost:4000'
const SeverLink = 'https://still-cover-backend.uc.r.appspot.com'

class Profile extends React.Component{
    constructor(){
        super()
        this.state = {
            profiler:[],
            errorpage: 0,
            editroute:false,
            isLoggedIn:[]
        }
    }
    componentDidMount(){
        try {
            this.checkUrl()
            this.getUserDetails()
            this.getLoggedInUser()
        } catch (error) {
            
        }
    }
    //checkForUser URL
    checkUrl = async()=>{
        const Url = await fetch(`${SeverLink}/Authentication/Check/Url/${this.props.match.params.id}`)
        const res = await Url.json()
        if(res.error){
            this.setState({errorpage:1})
        }else if(res.success){
            this.setState({errorpage:0})
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
    getUserDetails = async()=>{
        const Fetchall = await fetch(`${SeverLink}/Authentication/${this.props.match.params.id}`,{
        })
        const response = await Fetchall.json()
        if(response.profiler){
            this.setState({profiler:response.profiler})
        }else{
            this.setState({errorpage:response})
        }

    }
    setEditRoute =(Route) =>{
        this.setState({editroute:Route})
    }
    render(){
        const {errorpage} = this.state
        return(
            <div>
                {
                    errorpage === 1 ?
                    <NotFound/>
                    :
                    
                       <>
                        <div className="main w-100">
                            {/* profileimage */ }
                        < div className="profile-cover  relative">
                        {
                                this.state.profiler.map((profile,i)=>{
                                    return(
                                        <ProfileImage
                                        key={profile._id}
                                        coverImg = {profile.coverimg}
                                        />
                                    )
                                })
                            }
                            </div>
                        {/* profile */ }
                        <div className="white center">
                            {
                                this.state.profiler.map((profile,i)=>{
                                    return(
                                        <ProfileCard
                                        key={i}
                                        id={profile._id}
                                        fullname = {profile.fullname}
                                        username={profile.username}
                                        country = {profile.country}
                                        region = {profile.region}
                                        state = {profile.state}
                                        profileimg = {profile.profileimg}
                                        editroute={this.setEditRoute}
                                        />
                                    )
                                })
                            }
                            
                                </div>
                                <div className="followbt">
                                    {
                                        this.state.profiler.length > 0?
                                        this.state.isLoggedIn === this.state.profiler[0]._id?
                                        null
                                        :
                                        <Followbtn 
                                        userid={ this.state.profiler.length > 0?
                                        this.state.profiler[0]._id:null}
                                        followtype={'people'}
                                        />
                                        :
                                        null
                                    }
                                        
                                </div>
                        </div>

                        {/* profileNewsfeed */ }
                        <div className="">
                            <ProfileNewsFeed 
                            address={ this.state.profiler.length > 0?
                            this.state.profiler[0]._id:null}
                            fullname={ this.state.profiler.length > 0?
                            this.state.profiler[0].fullname:null}
                            id={ this.state.profiler.length > 0?
                                this.state.profiler[0]._id:null}
                                loggedIn = {this.state.isLoggedIn}
                            />
                        </div>
                        {
                            this.state.editroute === true?
                            <div className="editing_panel fixed right-0">
                              <div className="edit_pane">
                                {
                                    this.state.profiler.length >0?
                                                    <ProfileEdit close={this.setEditRoute}
                                                        fullname={this.state.profiler[0].fullname}
                                                        username={this.state.profiler[0].username}
                                                        email={this.state.profiler[0].email}
                                                        country={this.state.profiler[0].country}
                                                        region={this.state.profiler[0].region}
                                                        about={this.state.profiler[0].about}
                                                        website={this.state.profiler[0].website}
                                                        profession={this.state.profiler[0].profession}
                                                        phone={this.state.profiler[0].phone}
                                                    />
                                    :null
                                }
                             
                              </div>
                        </div>
                            :null
                        }
                        
                       </>
                }
            </div>
        )
    }
}
export default Profile
