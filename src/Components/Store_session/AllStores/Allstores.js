import React from 'react'
import ProfileImage from './profileImage/profileImage'
import AllstoreTemp from './AllstoresTemp'
class AllStores extends React.Component{
 
    render(){
        return(
            <div>
                {/* profileimage */}
                <div className="profile-cover  relative">
                    <ProfileImage/>
                </div>
                <div className="">
                    <AllstoreTemp/>
                </div>
            </div>
        )
    }
}
export default AllStores