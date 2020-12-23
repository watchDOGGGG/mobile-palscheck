import React from 'react'
import { Avatar } from 'antd';
import Followbtn from '../../../Follow/followbtn.jsx'
const Pages =({result})=>{
    return(
        result.length > 0?
        result.map((page,i)=>{
            return(
                <main class="mw6 center">
                    <article class="dt w-100 bb b--black-05 pb2 mt2" href="#0">
                       
                       <div class="dtc w2 w3-ns v-mid">
                           
                               <Avatar size='large' src={page.profileImg}/>
                        
                            </div>
                        
                        <div class="dtc v-mid">
                        <a href={`${page.address}.page`}>
                            <h1 class="f6 f5-ns fw6 lh-title black mv0 tl">{page.name} </h1>
                         </a>   
            <h2 class="f6 fw4 mt0 mb0 black-60 tl">#{page.desc}</h2>
      </div> 
                        <div class="dtc v-mid">
                            <div class="w-100 tr">
                            <Followbtn userid={page._id} followtype={'page'}/>
                            </div>
                        </div>
                    </article>
                </main>

            )
        })
        : <p>nothin here</p>
    )
}
export default Pages