import React from 'react'
import NewsFeedCard from './newsfeedCard.jsx'
import { Tabs } from 'antd';
import PostPannel from '../postPannel/postpannel';
import BookMark from '../Bookmark/BookMars/bookmark.jsx'
import PageLoading from '../../Loading/homepageLoading'

const localLink = 'http://localhost:4000'
const SeverLink = 'https://still-cover-backend.uc.r.appspot.com'

const { TabPane } = Tabs;

const pollStyle = {
    height:'auto',
    width: '100%',
    overflow: 'hidden',
}
class NewsFeed extends React.Component{
    constructor(){
        super()
        this.state = {
            Feeds:[],
            PageFeed:[]
        }
    }
    componentDidMount(){
     
        setInterval(() => {

        this.sendUsersToFetchFeed()
        }, 2000);        
    }
 
    sendUsersToFetchFeed = async()=>{
        
        try {
            const fetchFeed = await fetch(`${SeverLink}/Feed/getFeeds/forMe`,{
                method: 'POST',
                headers:{token:localStorage.token,"content-Type":"application/json"},
                body:JSON.stringify({
                    following:this.props.following
                })
            })
            const res = await fetchFeed.json()
            if(res.feeds){
                this.setState({Feeds:res.feeds})
            }
        } catch (error) {
            
        }
    }
  
    render(){
       
        return(

                <article class="newfeed--3-art ba b--black-10">
           
                <Tabs defaultActiveKey="1" centered>
                    <TabPane tab="palsFeed" key="1">
                        
                        <PostPannel/>
                        {
                            this.state.Feeds.length === 0?
                            <PageLoading/>
                                :
                                <NewsFeedCard
                                    AllFeeds={this.state.Feeds}
                                    loggedIn={this.props.loggedIn}
                                />
                        }
                        
                    </TabPane>
                  
                    <span>end</span>
                </Tabs>
                </article>

        )
    }
}
export default NewsFeed
