import React,{useState,useEffect} from 'react'

const CountFollow = ({userid})=>{
    const [followers,setfollowersCount] = useState([])

    useEffect(()=>{
        GetFollowersCount()
    })

    //followers count
    const GetFollowersCount = async()=>{
        const fetchAll = await fetch(`https://still-cove-26148.herokuapp.com/Authentication/countfollowers/${userid}`)
        const response = await fetchAll.json()
        if(response.count){
            setfollowersCount(response.count)
        }
    }
    return(
        <>
            {followers}
        </>
    )
}
export default CountFollow