import React from 'react'
import NewsFeedTemp from './newsFeedTemp.jsx'
const NewsFeedCard = ({AllFeeds,loggedIn})=>{
    return(
        <div>
            {
                AllFeeds.map((feeds,i)=>{
                    return(
                        <>
                        <NewsFeedTemp
                            key={i}
                            id={AllFeeds[i]._id}
                            feedby={AllFeeds[i].feedby}
                            feedTxt={AllFeeds[i].feedTxt}
                            feedType={AllFeeds[i].feedType}
                            feedDesc={AllFeeds[i].feedDesc}
                            feedPrice={AllFeeds[i].feedPrice}
                            date={AllFeeds[i].date}
                            loggedIn = {loggedIn}
                        />
                        </>
                    )
                })
            }
        </div>
    )
}
export default NewsFeedCard