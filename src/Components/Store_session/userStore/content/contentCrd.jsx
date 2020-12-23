import React from 'react'
import ContentTemp from './contentTemp.jsx'
import Loading from '../../../Loading/pageLoading.jsx'
const contentCrd = ({contents})=>{
    return(
        <>

        {
            contents.length > 0?
            contents.map((content,i)=>{
                return(
                    <ul class="imglist">
                    <ContentTemp
                    key={i}
                    feedid={contents[i]._id}
                    feedby={contents[i].feedby}
                    desc={contents[i].feedDesc}
                    price={contents[i].feedPrice}
                    txt={contents[i].feedTxt}
                    />
                    </ul>
                )
            })
            :
            <span className="w-50 center">
                <Loading/>
            </span>
        }
        
         </>
    )
}
export default contentCrd