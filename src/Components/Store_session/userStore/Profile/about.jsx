import React from 'react'
import { PhoneOutlined} from '@ant-design/icons';
import Followbtn from '../../../Follow/followbtn'
import MoreAbout from './moreAbout.jsx'
const About = ({isLoggedIn,pagename,id,ProfileImage,about,address,websites,region,country,phone})=>{ 

    return(
        <div className="mt5">
            <div className="tc f5">About</div>
            <article class="w-90 center bg-white br3 pa3 pa4-ns mv3 ba b--black-10">
                <div class="tc">
                    <img src={ProfileImage} class="br-100 h3 w3 dib" title={pagename} />
                    <h1 class="f4">{pagename}</h1>
                    <hr class="mw3 bb bw1 b--black-10" />
                </div>
                <p class="lh-copy measure center f6 black-70">
                    {about}
                </p>
                <div className="flex">
                <Followbtn userid={id} followtype={'page'}/>
                <button class="f6 button-reset bg-washed-green ba b--near-white dim pointer pv1 blue b tc ml3"><PhoneOutlined/>contact</button>
                
                <MoreAbout 
                pagename={pagename}
                id={id}
                ProfileImage={ProfileImage}
                about={about}
                address={address}
                country={country}
                phone={phone}
                region={region}
                websites={websites}
                />
                </div>
                 </article>
        </div>
    )
}
export default About