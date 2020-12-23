import React, { useEffect, useState } from 'react'
import '../profile.css'
import {EnvironmentFilled,GlobalOutlined,SettingOutlined,ProfileOutlined,FlagOutlined} from '@ant-design/icons';
import { Statistic, Row, Col ,Avatar,Popover} from 'antd';
import Poll from '../../Polls/sendpoll.jsx'
import defaultImg from './palscheck.jpg'
import {Modal} from 'antd';
import Followers from '../Followers/followers.jsx'

const localLink = 'localhost:4000'
const SeverLink = 'https://still-cove-26148.herokuapp.com'

const ProfileCard = ({ fullname, username, profileimg, editroute,id,country,region }) => {

    const [pages,setpages] = useState([])
    const [pollCount,setPollCount] = useState([])
    const [following,setfollowingCount] = useState([])
    const [followers,setfollowersCount] = useState([])
    const [isLoggedIn,setisLoggedin] = useState([])
    const [visible,setVisible] = React.useState(false)

    useEffect(()=>{
        getAlluserPage()
        GetPollCount()
        GetFollowingCount()
        GetFollowersCount()
        getLoggedInUser()
    })
      const showModal = () => {
        setVisible(true);
      };
 
      const handleCancel = e => {
        setVisible(false);
      };
//getLoggedInuser
    const getLoggedInUser = async()=>{
    const getLogginUser = await fetch(`${SeverLink}/Authentication/User/LoggedIn`,{
        headers:{token:localStorage.token}
    })
    const response = await getLogginUser.json()
    setisLoggedin(response.loggedIn)
}
    //following GetPollCount
    const GetFollowingCount = async()=>{
        const fetchAll = await fetch(`${SeverLink}/Authentication/countfollowing/${id}`)
        const response = await fetchAll.json()
        if(response.count){
            setfollowingCount(response.count)
        }
    }
    //followers count
    const GetFollowersCount = async()=>{
        const fetchAll = await fetch(`${SeverLink}/Authentication/countfollowers/${id}`)
        const response = await fetchAll.json()
        if(response.count){
            setfollowersCount(response.count)
        }
    }
    //getPoll count
    const GetPollCount = async()=>{
        const fetchAll = await fetch(`${SeverLink}/Feed/poll/count/${id}`)
        const response = await fetchAll.json()
        if(response.count){
            setPollCount(response.count)
        }
    }
    const getAlluserPage = async()=>{
        const fetchPages = await fetch(`${SeverLink}/Page//mypage/${id}`)
        const response = await fetchPages.json()
        if(response.pages){
            setpages(response.pages)
        }
    }
   const redirectTopage=(address)=>{
        window.location.href = `https://store.palscheck.com/${address}`;
     }
    const text = <span>#pages</span>;
    const content = (
        <div>
            {
                pages.length > 0 ?
                    pages.map((page,i)=>{
                        return(
                            <a onClick={e=>redirectTopage(`${page.address}`)} className="flex bb b--black-10">
                                
                                    <Avatar src={page.profileImg} size='small'/>
                                 
                                <p className="ml1">{page.name}</p>
                            </a>
                            
                        )
                    })
                :
                <p>no pages</p>
            }
            
        </div>
    );
    return(
        <article className="center pa3 pa4-ns b--black-10 ">
        <div className="tc profile palscheck-p3 pa3">
            {
                profileimg?
                <Avatar src={profileimg} className="dib" size={80}/>
                :<Avatar src={defaultImg} className="dib" size={80}/>
            }
           
                <span className="f6 db">{fullname}</span>
                <span className="f6 db profile-cardUsername">@{username}</span>
            </div>
            <div class="flex profile-card">
                <div class=" w-25 pa1 ba b--black-20 f-name">
                    <Popover placement="bottom" title={text} content={content} trigger="click">
                        <span className=" f6 pointer"><ProfileOutlined />
                <span className="db">page</span>
                </span>
                    </Popover>

                </div>
                {
                    isLoggedIn === id ?
                    null:
                    isLoggedIn !== id?
                    <div class=" w-25 pa1 ba b--black-20">
                <Poll username={fullname}
                    userid={id}
                />
                </div>
                :null
                }
                
                {
                    isLoggedIn !== id ?
                    null:
                    isLoggedIn === id ?
                    <div class=" w-25 pa1  ba b--black-20 f-name" >
                <span className=" f6  pointer" onClick={(e)=>editroute(true)}><SettingOutlined />
                <span className="db ">Edit</span>
                </span>
                </div>
                :null
                }
                
            </div>
        <div className="db">
            {/* location */}
            <span className="lh-copy measure center f5  db ttc"><EnvironmentFilled /> Location</span>
            
            {/* address */}
            <span className="lh-copy measure center f5  db ttc"><span className="ml3"><FlagOutlined /></span> country: {country}</span>
            <span className="lh-copy measure center f5  db ttc"><span className="ml3"><GlobalOutlined /></span> region: {region}</span>
           
        </div>

        <Row gutter={16} className="mt4 fw4">
            <Col span={8}>
            <Statistic title="Polls" value={pollCount} />
            </Col>
            <Col span={8} onClick={showModal} className="pointer dim">
            <Statistic title="Followers" value={followers} />
            </Col>
            <Col span={8} onClick={showModal} className="pointer dim">
            <Statistic title="Following" value={following} />
            </Col>
        </Row>
        <Modal
          visible={visible}
          title={`${fullname} followers`}
          onCancel={handleCancel}
          footer={[
            
          ]}
        >
          <Followers userid={id} loggedInUser={isLoggedIn}/>
        </Modal>
        </article>
    )
}
export default ProfileCard