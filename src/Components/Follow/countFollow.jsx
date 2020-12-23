import React,{useState,useEffect} from 'react'

const CountFollow = ({userid})=>{
    const [following,setfollowingCount] = useState([])

    useEffect(()=>{
        GetFollowingCount()
    })

    //following GetPollCount
    const GetFollowingCount = async()=>{
        const fetchAll = await fetch(`https://still-cove-26148.herokuapp.com/Authentication/countfollowing/${userid}`)
        const response = await fetchAll.json()
        console.log(response)
        if(response.count){
            setfollowingCount(response.count)
        }
    }
    
    return(
        <>
            {following.count}
        </>
    )
}
export default CountFollow