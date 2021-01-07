import React, { useState,useEffect } from 'react'
import {BookOutlined} from '@ant-design/icons';

const localLink = 'localhost:4000'
const SeverLink = 'https://still-cover-backend.uc.r.appspot.com'
const style = { background: '', padding: '8px 0' };
const BookMarkbtn = ({feed_id,feed_by})=>{
    const [booked,setbook] = useState([])
    useEffect(()=>{
        checkIfMarked()
    })

    const bookfeed = async()=>{
        const sendbook = await fetch(`${SeverLink}/Feed/bookmark`,{
            method: 'POST',
            headers:{"Content-Type":"application/json",token:localStorage.token},
            body: JSON.stringify({
                feed_id:feed_id
            })
        })
        const response = await sendbook.json()
        if(response.booked){
            setbook(response.booked)
        }
    }

    const checkIfMarked = async()=>{
        const checkMarked = await fetch(`${SeverLink}/Feed/checkforbookmark/${feed_id}`,{
            headers:{token:localStorage.token}
        })
        const response = await checkMarked.json()
        if(response.result){
            setbook(response.result)
        }
    }
    return(
        <>
        {
            booked.length > 1 ?
            <div style={style} className="blue"><BookOutlined /></div>
            :<div style={style} className="hover-blue"><BookOutlined  onClick={bookfeed}/></div>
        }
            

        </>
    )
}
export default BookMarkbtn