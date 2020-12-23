import React from 'react'
import { Image } from 'antd';
import { Carousel } from 'antd';
import defaultImg from '../shops.jpg'
const ProfileImage = ()=>{
    return(
        <div className="profile-image">
            <Carousel autoplay>
                <Image
                className="w-100 pointer"
                src={`https://i1.wp.com/www.getmeashop.com/blog/wp-content/uploads/2017/10/store-name.jpg?resize=1170%2C527&ssl=1`}
                />
                <Image
                className="w-100 pointer"
                src={`https://www.nclack.k12.or.us/sites/default/files/imageattachments/rowe/page/57781/store_image.png`}
                />
            </Carousel>
            
        </div>
    )
}
export default ProfileImage