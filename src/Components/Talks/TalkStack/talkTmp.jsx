import React, { useState,useEffect } from 'react'
import {Button} from 'antd';

const TalkTemp = ({address,user,date})=>{
    const [talkDT,setTalkDT] = useState([])
    const [media,setmedia] = useState([])
    useEffect(()=>{
        getTalkdtls()
        Feedmedia()
    },[])

    const getTalkdtls = async()=>{
        const getDetails = await fetch(`https://still-cover-backend.uc.r.appspot.com/Feed/getfeedbyid/${address}`)
        const response = await getDetails.json()
        if(response.result){
            setTalkDT(response.result)
        }
    }
      //GEt feedMedia
   const Feedmedia = async()=>{
    const FetchAllMedia = await fetch(`https://still-cover-backend.uc.r.appspot.com/Feed/${address}`)
    const response = await FetchAllMedia.json()
    if(response.results){
        setmedia(response.results)
    }
  }
   // convey Time Frame
   const time_ago = (time) =>{

    switch (typeof time) {
      case 'number':
        break;
      case 'string':
        time = +new Date(time);
        break;
      case 'object':
        if (time.constructor === Date) time = time.getTime();
        break;
      default:
        time = +new Date();
    }
    var time_formats = [
      [60, 'seconds', 1], // 60
      [120, '1 minute ago', '1 minute from now'], // 60*2
      [3600, 'minutes', 60], // 60*60, 60
      [7200, '1 hour ago', '1 hour from now'], // 60*60*2
      [86400, 'hours', 3600], // 60*60*24, 60*60
      [172800, 'Yesterday', 'Tomorrow'], // 60*60*24*2
      [604800, 'days', 86400], // 60*60*24*7, 60*60*24
      [1209600, 'Last week', 'Next week'], // 60*60*24*7*4*2
      [2419200, 'weeks', 604800], // 60*60*24*7*4, 60*60*24*7
      [4838400, 'Last month', 'Next month'], // 60*60*24*7*4*2
      [29030400, 'months', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
      [58060800, 'Last year', 'Next year'], // 60*60*24*7*4*12*2
      [2903040000, 'years', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
      [5806080000, 'Last century', 'Next century'], // 60*60*24*7*4*12*100*2
      [58060800000, 'centuries', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
    ];
    var seconds = (+new Date() - time) / 1000,
      token = 'ago',
      list_choice = 1;
  
    if (seconds == 0) {
      return 'Just now'
    }
    if (seconds < 0) {
      seconds = Math.abs(seconds);
      token = 'from now';
      list_choice = 2;
    }
    var i = 0,
      format;
    while (format = time_formats[i++])
      if (seconds < format[0]) {
        if (typeof format[2] == 'string')
          return format[list_choice];
        else
          return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
      }
    return time;
  }
  const LeaveTalk = async(address)=>{
    const leave = await fetch(`https://still-cover-backend.uc.r.appspot.com/Talk//delete/${address}`,{
      headers:{token:localStorage.token}
    })
    const res = await leave.json()
    if(res.deleted){
      window.location ="/talks"
    }
  }
    return(
        <>
            <li className="mv3 ba b--black-10 pointer grow db pa2">
                <div className="tr"><Button onClick={e=>LeaveTalk(address)}>leave</Button></div>
                        <a href={`${address}.talk`}>
                        <div class="dt pa1">
                        <div class="">
                            <p class="tl f5">
                            {talkDT.feedTxt}
                            </p>
                            <span className="tl gray mr1">{time_ago(new Date(talkDT.date))}</span>
                        </div>
                        <div class="">
                            {
                                media.length>0?
                                media.map((imgs,i)=>{
                                    return(
                                      <div>
                                        {
                                          imgs.url.length === 1?
                                          <div className='w-100'>
                                            <img src={imgs.url} className="ml4"/>
                                          </div>
                                          :
                                          <div className="flex flex-break w-30">
                                            <img src={imgs.url} className="ml4"/>
                                          </div>
                                        }
                                      </div>
                                        
                                       
                                    )
                                })
                                :null
                            }
                        </div>
                        </div>
                        </a>
                    </li>
        </>
    )
}
export default TalkTemp