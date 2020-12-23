import React from 'react'
import { Image } from 'antd';
import defaultImg from './palscheck.jpg'

const ProfileImage = ({ProfileImage})=>{
    
        return(
        <div className="profile-image">
            {
                ProfileImage?
                <Image
            className="w-100 pointer"
            src={ProfileImage}
            />
            :<Image
            className="w-100 pointer"
            src={defaultImg}
            />
            }
            
        </div>
    )
}
export default ProfileImage