import React from 'react'
import NewsFeedTemp from './newsFeedTemp'

const NewsFeedCard = ({AllFeeds})=>{
    return(
        <div>
            {
                AllFeeds.map((feeds,i)=>{
                    return(
                        <NewsFeedTemp
                            key={i}
                            id={AllFeeds[i]._id}
                            feedby={AllFeeds[i].feedby}
                            feedTxt={AllFeeds[i].feedTxt}
                            feedType={AllFeeds[i].feedType}
                            feedDesc={AllFeeds[i].feedDesc}
                            feedPrice={AllFeeds[i].feedPrice}
                            date={AllFeeds[i].date}
                        />
                    )
                })
            }
            
        </div>
    )
}
export default NewsFeedCard