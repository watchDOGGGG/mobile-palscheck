import React,{useEffect,useState} from 'react'
import { Avatar } from 'antd';
import Followbtn from '../../../Follow/followbtn.jsx'

const Users =({result,isLoggedIn})=>{
console.log(result)
    return(
        result.length > 0?
        result.map((user,i)=>{
            return(
                <main class="mw6 center">
                    <article class="dt w-100 bb b--black-05 pb2 mt2" href="#0">
                       
                       <div class="dtc w2 w3-ns v-mid">
                          
                               <Avatar size='large' src={user.profileimg}/>
                              
                            </div>
                        
                        <div class="dtc v-mid">
                        <a href={`${user.username}.pal`}>
                            <h1 class="f6 f5-ns fw6 lh-title black mv0 tl">{user.fullname} </h1>
                            </a>
                            <h2 class="f6 fw4 mt0 mb0 black-60 tl">@{user.username}</h2>
                        </div>
                        {
                            isLoggedIn?
                            isLoggedIn !== user._id ?
                                <div class="dtc v-mid">
                                    <div class="w-100 tr">

                                        <Followbtn userid={user._id} followtype={'people'}/>
                                    </div>
                                </div>
                                :
                                null
                            :null
                        }
                    </article>
                </main>

            )
        })
            : <p>nothin here</p>
    )
}
export default Users