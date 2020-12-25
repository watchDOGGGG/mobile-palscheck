import React from 'react'
import NewsFeedCard from './newsfeedCard.jsx'
import { Tabs } from 'antd';
import {EllipsisOutlined} from '@ant-design/icons';
import PostPannel from '../postPannel/postpannel';
import BookMark from '../Bookmark/BookMars/bookmark.jsx'
import PageLoading from '../../Loading/pageLoading'
import Poll from '../../Polls/pollAp'
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
            this.FetchAllFeed()
        }, 3000);
    }
    FetchAllFeed = async()=>{
        const FetchAll = await fetch('https://still-cove-26148.herokuapp.com/Feed/',)
        const response = await FetchAll.json()
        if(response.results){
            this.setState({Feeds:response.results})
        }
    }
    render(){
        
        return(

                <article class="newfeed--3-art center  b--black-10">
                <Tabs defaultActiveKey="1" centered>
                    <TabPane tab="palsFeed" key="1">
                        
                        <PostPannel/>
                        {
                            this.state.Feeds.length === 0?
                            <PageLoading/>
                                :
                                <NewsFeedCard
                                    AllFeeds={this.state.Feeds}
                                />
                        }
                        
                    </TabPane>
                    <TabPane tab="Bookmark" key="4">
                        <BookMark/>
                    </TabPane>
                  
                    <span>end</span>
                </Tabs>
                </article>

        )
    }
}
export default NewsFeed
