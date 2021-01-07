import React,{useState,useEffect} from 'react'
import { Popover,} from 'antd';

const StoresCrd = ({id,name,address,desc,profileImg})=>{
const [offers,setoffers] = useState([])
useEffect(()=>{
    getPageOffers()
})
    
const getPageOffers = async()=>{
        const fetchOffers = await fetch(`https://still-cover-backend.uc.r.appspot.com/Page/offers/${id}`)
        const response = await fetchOffers.json()
        if(response.offers){
            setoffers(response.offers)
        }
    }
    const content = (
        <div className="pointer">
            <span className="db pa1 tc">
                category: {desc}
            </span>
            {
                offers.length >0?
                offers.map((offer,i)=>{
                    return(
                        <span className="ml2 f6 ba br3 b--black-10 pa1">{offer.offers}</span>
                    )
                })
                :null
            }
        </div>
     )
    return(
        <>
         <Popover content={content} title={name}>
            <li>
                <a href={`${address}.page`}>
                <div class="thumbnail">
                    <div class="thumbnail__container">
                        <div class="thumbnail__img" placeholder={name}>
                            <img src={profileImg} alt="palscheck store" />
                        </div>
                    </div>
                </div>
                </a>
            </li>
            </Popover>
        </>
    )
}
  export default StoresCrd
