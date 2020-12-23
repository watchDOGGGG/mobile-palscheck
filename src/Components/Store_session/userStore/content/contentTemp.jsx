import React,{useState,useEffect} from 'react'
import {MessageOutlined } from '@ant-design/icons';
import { Popover} from 'antd';

const ContentTemp = ({feedid,feedby,price,desc,txt})=>{
    const [feedmedia,setfeedmedia] = useState([])
    useEffect(()=>{
        Feedmedia()
    })

    const content = (
        <div className="pointer">
            <span className="db">
                {txt}
            </span>
            <small href="#" className="link dim lh-title blue">15.3k talking about this</small>
            &nbsp;
            &nbsp;
            &nbsp;
            <a href={`${feedid}.talk`} className="link dim lh-title black f5"><MessageOutlined /> join the talk</a>
            <div>
            {
                feedmedia.length > 0?
                feedmedia.map((media,i)=>{
                    return (
                        <>
                            <img alt="palscheck" src={media.url} className="w4"/>
                        </>
                    )
                })
                : null
            }
            </div>
        </div>
     )

       //GEt feedMedia
   const Feedmedia = async()=>{
    const FetchAllMedia = await fetch(`https://still-cove-26148.herokuapp.com/Feed/${feedid}`)
    const response = await FetchAllMedia.json()
    if(response.results){
      setfeedmedia(response.results)
    }
  }
  
    return(
        <>
        
            <Popover content={content} title={desc}>
                <li>
                    <a href={`${feedid}.feed`}>
                        <div class="thumbnail">
                            <div class="thumbnail__container">
                                <div class="thumbnail__img" placeholder={desc}>
                                    {
                                        feedmedia[0] ?
                                            <img alt="palscheck" src={feedmedia[0].url}/>
                                            : null
                                    }

                                </div>
                            </div>
                        </div>
                    </a>
                </li>
            </Popover>

        </>
    )
}
export default ContentTemp
