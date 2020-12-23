import React,{useState,useEffect} from 'react'
import {Avatar} from 'antd'

const FeedbackTmp =({address,from,txt})=>{
    const [userDetails,setUserDt] = useState([])
    const [poll,setpoll] = useState([])


useEffect(()=>{
    UserDetails()
    GetPoll()
})
     //GEt all user additional info
  const UserDetails = async()=>{
    const FetchAllDetails = await fetch(`https://still-cove-26148.herokuapp.com/Authentication/by_id/${from}`)
      const response = await FetchAllDetails.json()
      if (response.profiler) {
          setUserDt(response.profiler)
        }
    }

    const GetPoll = async()=>{
        const FetchAllDetails = await fetch(`https://still-cove-26148.herokuapp.com/Feed/poll_id/${address}`)
      const response = await FetchAllDetails.json()
      if (response.poll) {
        setpoll(response.poll)
        }
    }
    
    return (

        <li
            class="flex items-center lh-copy pa2 ph0-l bb b--black-10 w-60">
            {
                userDetails.profileimg ?
                    <Avatar size='large' src={userDetails.profileimg} />
                        :
                        <Avatar size='large' />
                }
      
      <div class="pl3 flex-auto tl">
        <span class="f6 db black-70">from -{userDetails.fullname}</span>
        <span class="f6 red">Feedback -</span><span class="f5 black">{txt}</span>
      </div>
      <div class="feedcrd br3" style={{ backgroundImage: `url(https://source.unsplash.com/collection/${address}/1600x900/daily)` }}>
  
  <div class="centered">{poll.txt}</div>
</div>
  </li>
        )
    
}
export default FeedbackTmp