import React, { useEffect } from 'react'
import { MessageOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const style = {padding: '8px 0' };
const Talkbtn = ({feed_id,title}) =>{

    useEffect(()=>{
    },[])

    const InsertUserToTalk = async()=>{
        const fetchAll = await fetch('https://still-cover-backend.uc.r.appspot.com/Talk/jointalk/user',{
            method:'POST',
            headers:{"Content-Type":"application/json",token:localStorage.token},
            body: JSON.stringify({
                feedid: feed_id
            })
        })
        const response = await fetchAll.json()
    }
        return(
            <>
            <div style={style}><Link to={`/${title}/${feed_id}.talk`}><MessageOutlined onClick={InsertUserToTalk}/></Link>&nbsp;<span className="f6"></span></div>
            </>
            
        )
}
export default Talkbtn
