import React, { useState,useEffect } from 'react'

const localLink = 'http://localhost:4000'
const SeverLink = 'https://still-cover-backend.uc.r.appspot.com'
const Followbtn =({userid,followtype})=>{
    
    const [btnroute,setbtnroute] = useState(0)

    useEffect(()=>{
       try {
        CheckFollowing()
       } catch (error) {
           
       }
    })
    
    //checkIFUsers are following
    const CheckFollowing = async()=>{
        const Start = await fetch(`${SeverLink}/Authentication/checkfollow/${userid}`,{
            headers:{token:localStorage.token}
        })
        const response = await Start.json()
        if(response.following){
            setbtnroute(1)
        }else{
            setbtnroute(0)
        }

    }
    //startFollowwing
    const startFollowing = async()=>{
        const Start = await fetch(`${SeverLink}/Authentication/follow/${userid}`,{
            method:'POST',
            headers:{'Content-Type':'application/json',token:localStorage.token},
            body: JSON.stringify({
                type:followtype
            })
        })
        const response = await Start.json()
        if(response.follow){
            setbtnroute(1)
        }else{
            setbtnroute(0)
        }

    }
    return (
        <div>
            {
                btnroute === 1 ?
                <button class="f6 button-reset bg-blue ba b--black-10 pointer pv1 black-60 white" onClick={startFollowing}>Unfollow</button> :
                    <button class="f6 button-reset bg-blue ba b--black-10 pointer pv1 black-60 white" onClick={startFollowing}>+ Follow</button>
            }
        </div>
    )
}
export default Followbtn