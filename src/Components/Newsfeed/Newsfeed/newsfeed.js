import React from 'react'
import NewsFeedCard from './newsfeedCard.jsx'
import { Tabs } from 'antd';
import PostPannel from '../postPannel/postpannel';
import BookMark from '../Bookmark/BookMars/bookmark.jsx'
import PageLoading from '../../Loading/homepageLoading'
import io from 'socket.io-client'

const Socket = io.connect('http://localhost:4000')

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
     
           Socket.on('FeedsForYou',data=>{
            this.setState({Feeds:data})
        })
      
        
    }
 
  
    render(){
        if(this.props.following.length>0||this.props.loggedIn){
            Socket.emit('getFeed',this.props.following,this.props.loggedIn)
            
        }
        
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
