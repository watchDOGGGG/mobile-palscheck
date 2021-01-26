import React,{useState,useEffect} from 'react'
import {Avatar} from 'antd'
import Followbtn from '../../../Follow/followbtn'

const localLink = 'http://localhost:4000'
const SeverLink = 'https://still-cover-backend.uc.r.appspot.com'

const Followers = ({follow_from})=>{ 
  const [userInfo, setUserInfo] = useState([])

  useEffect(()=>{
    getUserdetails()
  })

  const getUserdetails = async()=>{
    const fetchData = await fetch(`${SeverLink}/Authentication/by_id/${follow_from}`)
    const response  = await fetchData.json()

    if(response.profiler){
      setUserInfo(response.profiler)
    }
  } 
  
    return(
        <>
            
    <article class="dt w-100 bb b--black-05 pb2 mt2" href="#0">
      <div class="dtc w2 w3-ns v-mid">
        <Avatar size="large" src={userInfo.profileimg} class=""/>
      </div>
      <div class="dtc v-mid pl3">
    <span class="f6 f6-ns fw6 lh-title mv0">{userInfo.fullname}</span>
    <span class="f6 fw4 mt0 mb0 db">@{userInfo.username}</span>
      </div>
      <div class="dtc v-mid">
       <a href={`${userInfo.username}.pal`} class="f6 button-reset bg-washed-green ba b--near-white dim pointer pv1 blue b tc ml3">profile</a>
      </div>
    </article>
    </>
    )
}
export default Followers