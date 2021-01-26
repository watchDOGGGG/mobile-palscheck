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
        const fetchAll = await fetch(`https://still-cover-backend.uc.r.appspot.com/Page/${this.props.match.params.id}`,)
        const response = await fetchAll.json()
        if(response.data){
            this.setState({pageData:response.data})
        }
    }
     //getLoggedInuser
     getLoggedInUser = async()=>{
        const getLogginUser = await fetch('https://still-cover-backend.uc.r.appspot.com/Authentication/User/LoggedIn',{
            headers:{token:localStorage.token}
        })
        const response = await getLogginUser.json()
        this.setState({isLoggedIn:response.loggedIn})
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
                        ProfileImage={pageData.profileImg}
                        loggedIn = {isLoggedIn}
                    />
                </div>
            </div>
        )
    }
}
export default Store