import React, { useState,useEffect } from 'react'
import {CaretRightOutlined} from '@ant-design/icons';
import Avatar from 'antd/lib/avatar/avatar';

const Polltemp = ({txt,from,address,key})=>{
const [userDetails,setUserDt] = useState([])
const [feedback,setfeedback] = useState([])
const [msg,setmsg] = useState([])

useEffect(()=>{
    UserDetails()
})
     //GEt all user additional info
  const UserDetails = async()=>{
    const FetchAllDetails = await fetch(`https://still-cover-backend.uc.r.appspot.com/Authentication/by_id/${from}`)
      const response = await FetchAllDetails.json()
      if (response.profiler) {
          setUserDt(response.profiler)
        }
    }

    const handleChange = (event)=>{
        setfeedback(event.target.value)
    }
    const SendpollFeedback = async()=>{
        const sendpoll = await fetch('https://still-cover-backend.uc.r.appspot.com/Feed/poll/feedback',{
            method:'POST',
            headers:{"Content-Type":"application/json",token:localStorage.token},
            body: JSON.stringify({
                address: address,
                txt:feedback,
                to:from
            })
        })
        const res = await sendpoll.json()
        if(res.success){
            setfeedback('')
            setmsg('sent..')
        }
    }

    return (
        <a class="card" href="#!">
            <div class="front" style={{ backgroundImage: `url(https://source.unsplash.com/collection/${address}/1600x900/daily)` }}>
                {
                    userDetails.profileimg ?
                       <span className="pollImg">
                            <Avatar size={'large'} src={userDetails.profileimg} alt="palscheck"/>
                       </span>
                        :
                        <span className="pollImg">
                            <Avatar size={'large'} alt="palscheck"/>
                       </span>
                }

                <p>{txt}.</p>
            </div>
            <div class="back">
                <div>
                    <span className="db  f5"><a href={`${userDetails.username}.pal`}>from-{userDetails.fullname}</a></span>
                    <span className="db gray f6">@{userDetails.username}</span>
                    <p>send Feedback</p>
                    <textarea className="" placeholder="write feedback here.." value={feedback} onChange={e => handleChange(e)}></textarea>
                    <span className="db">{msg}</span>
                    {
                        feedback.length > 0 ?
                            <button onClick={SendpollFeedback} class="button">send<CaretRightOutlined /></button>
                            :
                            <button class="button" disabled>send<CaretRightOutlined /></button>
                    }

                </div>
            </div>
        </a>
    )
}
export default Polltemp