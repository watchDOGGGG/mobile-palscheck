import Avatar from 'antd/lib/avatar/avatar'
import React, { useState,useEffect } from 'react'
import {Link} from 'react-router-dom'
import Followbtn from '../../Follow/followbtn.jsx'

const FollowersTemp = ({follow_from}) =>{
  const [userDetail,setUserDt] = useState([])
  const [isLoggedIn,setisLoggedin] = useState([])

  useEffect(()=>{
    UserDetails()
    getLoggedInUser()
  })
      //GEt all user additional info
      const UserDetails = async()=>{
        const FetchAllDetails = await fetch(`https://still-cover-backend.uc.r.appspot.com/Authentication/by_id/${follow_from}`)
          const response = await FetchAllDetails.json()
          if (response.profiler) {
              setUserDt(response.profiler)
            }
        }
        
     const getLoggedInUser = async()=>{
    const getLogginUser = await fetch('https://still-cover-backend.uc.r.appspot.com/Authentication/User/LoggedIn',{
        headers:{token:localStorage.token}
    })
    const response = await getLogginUser.json()
    setisLoggedin(response.loggedIn)
}
console.log(userDetail)
return(
        <article className="center mv3 b--black-10">
            <main class="mw6 center">
            <article class="dt w-100 bb b--black-05 pb2 mt2" href="#0">
                 <a href={`${userDetail.username}.pal`}>
                 {
                    userDetail.profileimg ?
                      <Avatar size='large' src={userDetail.profileimg} />
                      :
                      <Avatar size='large' />
                  }
                  <div class="dtc v-mid pl3 tl">
                    <h1 class="f6 f5-ns fw4 lh-title black mv0 tl">{userDetail.fullname}</h1>
                    {userDetail.profession ?
                      <h2 class="f6 fw4 mt0 mb0 black-60">#{userDetail.profession[0].skill}</h2>
                      : null
                    }

                  </div>
                 </a>
        <div class="dtc v-mid">
        <div class="w-100 tr">
        {
        isLoggedIn === follow_from?
        null
        :
        <Followbtn userid={userDetail._id}/>
          }
          
        </div>
      </div>
    </article>
  </main>

        </article>
    )
}
export default FollowersTemp