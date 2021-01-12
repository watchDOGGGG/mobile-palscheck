import React, { useState,useEffect } from 'react'
import {Avatar} from 'antd';
import { UserOutlined,ShoppingFilled,HeartFilled,FundFilled } from '@ant-design/icons';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import { Link } from 'react-router-dom';

const NotificationTemp = ({addressFrom,notify_action,notify_content,date,id,notify_from,notify_for,viewed})=>{
  const [userInfo,setUserInfo] = useState([])
  const [userInfoFor,setUserInfoFor] = useState([])
  const [view,setview] = useState(0)
  useEffect(()=>{
    UserDetails()
    UserDetailsFor()
  })

  //GEt all user additional info

  const UserDetails = async () => {
    if (notify_from === 'palscheck') {
      return (null)
    } else {
      const FetchAllDetails = await fetch(`https://still-cover-backend.uc.r.appspot.com/Authentication/by_id/${notify_from}`)
      const response = await FetchAllDetails.json()
      
      if (response.profiler) {
        setUserInfo(response.profiler)
      }
    }

  }
  const UserDetailsFor = async () => {
    if (notify_from === 'palscheck') {
      return (null)
    } else {
      const FetchAllDetails = await fetch(`https://still-cover-backend.uc.r.appspot.com/Authentication/by_id/${notify_for}`)
      const response = await FetchAllDetails.json()
      
      if (response.profiler) {
        setUserInfoFor(response.profiler)
      }
    }

  }
  const UpdateNotify = async(address)=>{
    const UpdateN = await fetch(`https://still-cover-backend.uc.r.appspot.com/Authentication/update/Notify/${address}`,{
      method:"PATCH"
    })
    const response = await UpdateN.json()
    if(response.result){
      setview(1)
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
  
    if (seconds === 0) {
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
  
  return (
    <div>
      <ul class="list f6 tl pa1">
        {
          notify_action === 'following' ?
            // {/* notification from users action following*/}
            view === 0 && viewed === 0?
            <li className="bb b--black-10">
              <Link to={`${userInfo.username}.pal`}>
                <div class="dt flex pa1">
                  <div class="dib ml2">
                    <p class="lh-copy">
                     {notify_content}</p>
                    <span className="tr light-green f6 mr1"><FundFilled /></span>
                    <span className="tl gray mr1">{time_ago(new Date(date))}</span>
                  </div>

                </div>
              </Link>
              {
                           viewed===0?
                           <span className="bg-white ba b--black-10 pa1 grow" onClick={e=>UpdateNotify(id)}>
                             mark as read
                           </span>
                           :
                          null
                         }
            </li>
            :
            <li className="bb b--black-10">
              <Link to={`${userInfo.username}.pal`}>
                <div class="dt flex pa1">
                  <div class="dib ml2">
                    <p class="lh-copy">
                     {notify_content}</p>
                    <span className="tr light-green f6 mr1"><FundFilled /></span>
                    <span className="tl gray mr1">{time_ago(new Date(date))}</span>
                  </div>

                </div>
              </Link>
            </li>
            : notify_action === 'comment' ?
            view === 0 && viewed === 0?
              // {/* notification from users action comment*/}
              <li className="bb b--black-10 bg-light-blue">
                <a href={`${addressFrom}.feed`}>
                  <div class="dt flex pa1">
                    <div class="dib">
                      {
                        userInfo.profileimg?
                        <Avatar src={userInfo.profileimg} size={'large'} icon={<UserOutlined />} />
                        :
                        <Avatar size={'large'} icon={<UserOutlined />} />
                        
                      }
                    </div>
                    <div class="dib ml2">
                    <span className="gray db">{userInfo.fullname}</span>
                      <span className="gray db">@{userInfo.username}</span>
                      <p class="lh-copy">
                      {notify_content}</p>
                      <span className="tr light-green f6 mr1"><InsertCommentIcon /></span>
                      <span className="tl gray mr1">{time_ago(new Date(date))}</span>
                    </div>

                  </div>
                </a>
                {
                           viewed===0?
                           <span className="bg-white ba b--black-10 pa1 grow" onClick={e=>UpdateNotify(id)}>
                             mark as read
                           </span>
                           :
                          null
                         }
              </li>
              :
              <li className="bb b--black-10">
                <a href={`${addressFrom}.feed`}>
                  <div class="dt flex pa1">
                    <div class="dib">
                      {
                        userInfo.profileimg?
                        <Avatar src={userInfo.profileimg} size={'large'} icon={<UserOutlined />} />
                        :
                        <Avatar size={'large'} icon={<UserOutlined />} />
                        
                      }
                    </div>
                    <div class="dib ml2">
                    <span className="gray db">{userInfo.fullname}</span>
                      <span className="gray db">@{userInfo.username}</span>
                      <p class="lh-copy">
                      {notify_content}</p>
                      <span className="tr light-green f6 mr1"><InsertCommentIcon /></span>
                      <span className="tl gray mr1">{time_ago(new Date(date))}</span>
                    </div>

                  </div>
                </a>
              </li>
              : notify_action === 'reaction' ?
                // {/* notification from users action love*/}
                view === 0 && viewed === 0?
                <li className="bb b--black-10  bg-light-blue">
                  <a href={`${addressFrom}.feed`}>
                    <div class="dt flex">
                      <div class="dib">
                      {
                        userInfo.profileimg?
                        <Avatar src={userInfo.profileimg} size={'large'} icon={<UserOutlined />} />
                        :
                        <Avatar size={'large'} icon={<UserOutlined />} />
                        
                      }
                      </div>
                      <div class="dib ml2 ">
                      <span className="gray db">{userInfo.fullname}</span>
                      <span className="gray db">@{userInfo.username}</span>
                        <p class="lh-copy">{notify_content}</p>
                        <span className="tl dark-red f4 mr1"><HeartFilled /></span>
                        <span className="tl gray mr1">{time_ago(new Date(date))}</span>
                      </div>

                    </div>
                  </a>
                  {
                           viewed===0?
                           <span className="bg-white ba b--black-10 pa1 grow" onClick={e=>UpdateNotify(id)}>
                             mark as read
                           </span>
                           :
                          null
                         }
                </li>
                :
                <li className="bb b--black-10">
                  <a href={`${addressFrom}.feed`}>
                    <div class="dt flex">
                      <div class="dib">
                      {
                        userInfo.profileimg?
                        <Avatar src={userInfo.profileimg} size={'large'} icon={<UserOutlined />} />
                        :
                        <Avatar size={'large'} icon={<UserOutlined />} />
                        
                      }
                      </div>
                      <div class="dib ml2 ">
                      <span className="gray db">{userInfo.fullname}</span>
                      <span className="gray db">@{userInfo.username}</span>
                        <p class="lh-copy">{notify_content}</p>
                        <span className="tl dark-red f4 mr1"><HeartFilled /></span>
                        <span className="tl gray mr1">{time_ago(new Date(date))}</span>
                      </div>

                    </div>
                  </a>
                </li>
                   : notify_action === 'profileImg' ?
                   // {/* notification from users action love*/}
                   view === 0 && viewed === 0?
                   <li className="bb b--black-10 bg-light-blue">
                         <div class="dib ml2 ">
                           <p class="lh-copy">{notify_content}</p>
                           <span className="tl blue f4 mr1"><UserOutlined /></span>
                           <span className="tl gray mr1">{time_ago(new Date(date))}</span>
                         </div>
                         {
                           viewed===0?
                           <span className="bg-white ba b--black-10 pa1 grow" onClick={e=>UpdateNotify(id)}>
                             mark as read
                           </span>
                           :
                          null
                         }
                   </li>
                   :
                   <li className="bb b--black-10">
                         <div class="dib ml2 ">
                           <p class="lh-copy">{notify_content}</p>
                           <span className="tl blue f4 mr1"><UserOutlined /></span>
                           <span className="tl gray mr1">{time_ago(new Date(date))}</span>
                         </div>
                   </li>
                   
                : null
        }


      </ul>
    </div>

  )
}
export default NotificationTemp