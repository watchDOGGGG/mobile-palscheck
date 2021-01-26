import React,{useState,useEffect} from 'react'
import ReadMoreReact from 'read-more-react';
import RandomString from 'randomstring'
const localLink = 'http://localhost:4000'
const SeverLink = 'https://still-cover-backend.uc.r.appspot.com'
const randString = RandomString.generate()
const TrendingList = ({address,id,user}) =>{

  const [talkDT,setTalkDT] = useState([])
  const [talkCount,setCount] = useState([])
  
  useEffect(()=>{
      getTalkdtls()
      setInterval(() => {
        getTalkCount()
      }, 1000);
      
  },[])


  const getTalkdtls = async()=>{
      const getDetails = await fetch(`https://still-cover-backend.uc.r.appspot.com/Feed/getfeedbyid/${address}`)
      const response = await getDetails.json()
      if(response.result){
          setTalkDT(response.result)
      }
  }

  const getTalkCount = async()=>{
    const fetchCount = await fetch(`${SeverLink}/Talk/Talks/Count/${address}`)
    const response = await fetchCount.json()

    setCount(response.count)
  }
  const LeaveTalk = async (address) => {
    const leave = await fetch(`https://still-cover-backend.uc.r.appspot.com/Talk//delete/${address}`, {
      headers: { token: localStorage.token }
    })
    const res = await leave.json()
    if (res.deleted) {
      window.location = "/talks"
    }
  }
  const readMore = (
    <span class="db fname2 underline-hover pointer">
    see more...
  </span>
  )
  return (

    talkDT.feedTxt ?
      <li class="pv2 bb b--black-10">
       
          <span class="fw7 toggle-text fname">{
            <ReadMoreReact text={`#${talkDT.feedTxt}`}
                min={50}
                ideal={60}
                max={100}
                readMoreText={readMore}/>

          }</span>
          
          <span class="db fname2 underline-hover">{talkCount} mentions</span>
          <span class="db fname2 underline-hover blue pointer"><a className="blue" href={`${talkDT.feedTxt?talkDT.feedTxt:randString}/${address}.talk`}>view</a></span>
      
      </li>
      : null
  )
}
export default TrendingList