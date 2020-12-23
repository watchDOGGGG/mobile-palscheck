import React from 'react'
import TalkTmp from './talkTmp.jsx'

const TalkCrd = ({allTalk})=>{
    return(
        allTalk.map((talk,i)=>{
            return(
                <>
                <TalkTmp
                    key={i}
                    address={allTalk[i].address}
                    user={allTalk[i].user}
                    date={allTalk[i].date}
                />
                </>
            )
        })
    )
}
export default TalkCrd