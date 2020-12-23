import React,{useState,useEffect} from 'react'
import '../profile.css'
import { Image } from 'antd';
import defaultImg from './palscheck.jpg'

const ProfileImage = ({coverImg})=>{

    return(
        <div className="profile-image">
            
            {
                coverImg ?
                    <Image
                        className="w-100 pointer"
                        src={coverImg}
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