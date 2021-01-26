import React,{useState,useEffect} from 'react'
import FollowersCrd from './followersCrd.jsx'
const localLink = 'http://localhost:4000'
const SeverLink = 'https://still-cover-backend.uc.r.appspot.com'

const Followers = ({pageId})=>{
    const [followers,setFollowers] = useState([])

    useEffect(()=>{
        getAllFollowers()
    })
   const getAllFollowers = async()=>{
        const FetchFollowers = await fetch(`${SeverLink}/Authentication/getAllFollowers/${pageId}`)
        const result = await FetchFollowers.json()
        if(result.followers){
            setFollowers(result.followers)
        }
    }

    return(
        <div>
            <FollowersCrd followers={followers}/>
        </div>
    )
}
export default Followers