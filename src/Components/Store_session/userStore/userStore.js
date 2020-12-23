import React from 'react'
import ProfileImage from './profileImage/profileImage'
import StoreTemp from './userstoreTemp'
import Followbtn from '../../Follow/followbtn.jsx'
import {Button} from 'antd'
class Store extends React.Component{
    constructor(){
        super()
        this.state = {
            pageData:[],
            isLoggedIn:[]
        }
    }

    componentDidMount(){
        try {
            this.getPageData()
            this.getLoggedInUser()
        } catch (error) {
            
        }
    }
    getPageData = async()=>{
        const fetchAll = await fetch(`https://still-cove-26148.herokuapp.com/Page/${this.props.match.params.id}`,)
        const response = await fetchAll.json()
        if(response.data){
            this.setState({pageData:response.data})
        }
    }
     //getLoggedInuser
     getLoggedInUser = async()=>{
        const getLogginUser = await fetch('https://still-cove-26148.herokuapp.com/Authentication/User/LoggedIn',{
            headers:{token:localStorage.token}
        })
        const response = await getLogginUser.json()
        this.setState({isLoggedIn:response.loggedIn})
    }
    redirectTopage=(address)=>{
        window.location.href = `https://store.palscheck.com/page/${address}`;
    }
    render(){
        const {pageData,isLoggedIn} = this.state
        return(
            <div>
                {/* profileimage */}
                <div className="profile-cover relative">
                    <ProfileImage
                        ProfileImage={pageData.profileImg}
                    />
                </div>
                <div className="followbt">
                    <Followbtn
                        userid={pageData._id}
                        followtype={'page'}
                    />
                </div>
                <div className="storexpl">
                <button class="f6 button-reset bg-blue ba b--black-10 pointer pv1 black-60 white" onClick={e=>this.redirectTopage(pageData.address)}>Explore</button>
                </div>
                <div className="">
                    <StoreTemp 
                        id={pageData._id}
                        name={pageData.name}
                        address={pageData.address}
                        desc={pageData.desc}
                        admin={pageData.admin}
                        about={pageData.about}
                        websites={pageData.website}
                        phone = {pageData.phone}
                        country = {pageData.country}
                        region = {pageData.region}
                        loggedIn = {isLoggedIn}
                    />
                </div>
            </div>
        )
    }
}
export default Store