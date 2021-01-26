import React from 'react'
import Followers from './Followers.jsx'
const FollowersCrd =({followers})=>{

    return(
        <div className="mt5">
        <div className="tc f5">Followers</div>
            <main class="w-90 mw6 center">
            {
                followers.length >0?
                followers.map((users,i)=>{
                    return(
                        <Followers 
                        follow_from={followers[i].follow_from}
                        
                        />
                    )
                })
                :
            <p className="tc">be the first to follow this page </p>
            }
            </main>
            </div>
    )
}
export default FollowersCrd