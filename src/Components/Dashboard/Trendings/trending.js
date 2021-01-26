import React,{useState,useEffect} from 'react'
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import '../../Layout/layout.css'
import TrendingList from './trendingList'


const DataUrl = `https://still-cover-backend.uc.r.appspot.com/Talk/`;
const Trendings =()=>{

    const [data,setData] = useState([])

    useEffect(()=>{
        getData()
    },[])

      const getData = async()=>{
        const fetchAll = await fetch(DataUrl,{
            headers:{token:localStorage.token}
        })
        const response = await fetchAll.json()
        if(response.talks){
            setData(response.talks)
        }
    }

    return (
            <section class="">
                <article class="br2 pa4 mw6 center">
                    <div className="">
                        <h4 class="f5 fw4 fname dib v-mid mv0 mr3">Talks you join</h4>
                        {/* <a href="" class="f6 no-underline underline-hover blue dib v-mid mb0">Edit</a> */}
                    </div>
                    {
                        data.length > 0 ?
                            data.map((element, i) => {
                                return (

                                    <ul class="list f6 pl0 mt3 mb0">
                                        <TrendingList 
                                        id={element._id}
                                        address={element.address}
                                        user={element.user}
                                        />
                                    </ul>

                                )
                            })
                            : null
                    }
                </article>
            </section>
    )
}
export default Trendings