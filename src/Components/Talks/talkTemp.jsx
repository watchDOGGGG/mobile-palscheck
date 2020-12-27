import React,{useState,useEffect} from 'react'
import {Avatar} from 'antd';

const TalkTemp = ({address,user,txt,date,auth})=>{

    const [UserDT,setUserDetails] = useState([])

    useEffect(()=>{
      setInterval(() => {
        UserDetails()
      }, 500);
      
    },[])
  //GEt all user additional info
  const UserDetails = async()=>{
    const FetchAllDetails = await fetch(`https://still-cove-26148.herokuapp.com/Authentication/by_id/${user}`)
    const response = await FetchAllDetails.json()
    if(response.profiler){
      setUserDetails(response.profiler)
    }
  }

   //GEt feedMedia
 
 
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

    return(

      <>
      {
        auth?
        user === auth?
        <p className="pa2" style={{float:'right',width:'60%'}}>
        <span className="db ml4 tj bg-light-blue pa1 br3 talk__txt">{txt}</span>
        <span className="ml1 f6 light-blue db">{time_ago(new Date(date))}</span>
    </p>
        :
        <p className="pa2" style={{float:'left',width:'60%'}}>
         
        <div className="tl">
         
          {
            UserDT.profileimg?
            <Avatar src={UserDT.profileimg} size={'small'} /> 
              :
              <Avatar size={40} /> 
          }                          
        <a href={`${UserDT.username}.pal`} className="dib ml1 fw4 gray f6 link">@{UserDT.username}</a>
          
        </div>
        <span className="db ml4 tj bg-light-blue pa1 br3 talk__txt">{txt}</span>
        <span className="ml1 f6 light-blue">{time_ago(new Date(date))}</span>
    </p>
        :null
      }

      </>
        
    )
}
export default TalkTemp
