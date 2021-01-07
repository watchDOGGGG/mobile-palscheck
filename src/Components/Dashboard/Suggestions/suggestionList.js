import React from 'react'
import FollowBtn from '../../Follow/followbtn'

const SuggestionList =({name,username,id,profileimg})=>{


    return (
      
      profileimg?
          <div class="cards cards--two">
            <a href={`${username}.pal`}>
              <img src={profileimg} class="img-responsive" alt={name} />
            </a>
            
            <span class="cards--two__rect"></span>
            <span class="cards--two__tri"></span>
            <p>{name}</p>
            <span className="palsch_follow"><FollowBtn userid={id} followtype={'people'}/></span>
            
          </div>
        :null
    );
  
}

export default SuggestionList
